db.createUser({
    user: 'postsAdmin',
    pwd: 'postsAdminPw',
    roles: [
        {
            role: 'readWrite',
            db: 'posts'
        }
    ]
});