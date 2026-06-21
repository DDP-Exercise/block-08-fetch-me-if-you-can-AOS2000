"use strict";
import { Post } from "./class.post.js";
import { User } from "./class.user.js";
/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    Sadiq - 2026-06-09
 *  *******************************************************/
const usersArray = [];

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
        return null;
    }
}

async function initApp() {
    // Daten parallel via API holen
    const rawUsers = await fetchData("https://jsonplaceholder.typicode.com/users");
    const rawPosts = await fetchData("https://jsonplaceholder.typicode.com/posts");

    if (!rawUsers || !rawPosts) {
        document.getElementById("app").innerHTML = "<p>Fehler beim Laden der API-Daten.</p>";
        return;
    }

    const postsByUserId = {};
    rawPosts.forEach(p => {
        const postInstance = new Post(p.id, p.title, p.body);
        if (!postsByUserId[p.userId]) {
            postsByUserId[p.userId] = [];
        }
        postsByUserId[p.userId].push(postInstance);
    });

    const appContainer = document.getElementById("app");
    let htmlOutput = "";

    rawUsers.forEach(u => {
        const userInstance = new User(u.id, u.name, u.username, u.email, u.website);

        userInstance.posts = postsByUserId[u.id] || [];
        usersArray.push(userInstance);

        htmlOutput += userInstance.render();
    });

    appContainer.innerHTML = htmlOutput;

    setupEvents(appContainer);
}

function setupEvents(container) {
    container.addEventListener("click", async (event) => {
        const target = event.target;

        const userHeader = target.closest(".user-header");
        if (userHeader) {
            // Verhindert das Zuklappen, wenn man nur auf die Links klickt
            if (target.tagName === 'A') return;

            const userCard = userHeader.closest(".user-card");
            const userId = userCard.dataset.userId;
            const postsContainer = document.getElementById(`user-posts-${userId}`);

            postsContainer.classList.toggle("hidden");
            return;
        }

        if (target.classList.contains("load-comments-btn")) {
            const postId = parseInt(target.dataset.postId);
            const commentsContainer = document.getElementById(`comments-${postId}`);

            let foundPost = null;
            for (const user of usersArray) {
                foundPost = user.posts.find(p => p.id === postId);
                if (foundPost) break;
            }

            if (foundPost) {
                if (foundPost.comments.length === 0) {
                    target.innerText = "Lade...";
                    const commentsData = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

                    if (commentsData) {
                        foundPost.comments = commentsData;
                    }
                }
                commentsContainer.innerHTML = foundPost.renderComments();
                commentsContainer.classList.toggle("hidden");

                target.innerText = commentsContainer.classList.contains("hidden")
                    ? "Kommentare anzeigen"
                    : "Kommentare ausblenden";
            }
        }
    });
}

initApp();