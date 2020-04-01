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

module.exports.generateResetCode = (email, code) => {
    const q = `
        INSERT into password_reset
        VALUES ($1, $2)
        RETURNING *
    `;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.verifySecretCode = (email, code) => {
    const q = `
    SELECT *
    FROM password_reset
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1 AND code = $2 
    `;
    const params = [email, code];
    return db.query(q, params);
};
