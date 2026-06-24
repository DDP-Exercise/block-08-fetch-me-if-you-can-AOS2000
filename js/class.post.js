"use strict";
export class Post {
    constructor(id, title, body) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.comments = [];
    }

    render() {
        return `
            <div class="post-card" data-post-id="${this.id}">
                <h5>${this.title}</h5>
                <p>${this.body}</p>
                <button class="load-comments-btn" data-post-id="${this.id}">Kommentare laden</button>
                <div class="comments-container hidden" id="comments-${this.id}"></div>
            </div>
        `;
    }

    renderComments() {
        if (this.comments.length === 0) return `<p class="no-comments">Keine Kommentare vorhanden.</p>`;

        return this.comments.map(comment => `
            <div class="comment">
                <h6>${comment.name} (<small>${comment.email}</small>)</h6>
                <p>${comment.body}</p>
            </div>
        `).join('');
    }
}
/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/