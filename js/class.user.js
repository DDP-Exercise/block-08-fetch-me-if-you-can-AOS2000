"use strict";
export class User {
    constructor(id, name, username, email, website) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.website = website;
        this.posts = [];
    }

    render() {
        return `
            <div class="user-card" data-user-id="${this.id}">
                <div class="user-header">
                    <h3>${this.name} (${this.username})</h3>
                    <p>
                        📧 <a href="mailto:${this.email}">${this.email}</a> | 
                        🌐 <a href="http://${this.website}" target="_blank">${this.website}</a>
                    </p>
                </div>
                <div class="user-posts-container hidden" id="user-posts-${this.id}">
                    <h4>Posts von ${this.name}:</h4>
                    <div class="posts-list">
                        ${this.posts.map(post => post.render()).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}
/*******************************************************
 *  Users
 *
 *  See: https://jsonplaceholder.typicode.com/users
 *
 *  Your users should have:
 *      -id
 *      -name
 *      -username
 *      -email
 *      -website
 *
 *  You can skip address, phone and company.
 *
 *  users should also have posts[] (see main.js).
 *
 *  When printing a user, don't forget to make
 *      - href="mailto:.." for the email and
 *      - href=".." target="_blank" for the website.
 *  *******************************************************/