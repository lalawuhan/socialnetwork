const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

// USERS
module.exports.addUser = (first, last, email, password) => {
    const q = `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.getUser = email => {
    const q = `
        SELECT id, password 
        FROM users
        WHERE email=$1
    `;
    const params = [email];
    return db.query(q, params);
};

//Inseert into table for secret codes
module.exports.resetPassword = (id, code, email, created_at) => {
    const q = `
        SELECT * FROM password_reset
        WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';
        Update
    `;
    const params = [id, code, email, created_at];
    return db.query(q, params);
};
