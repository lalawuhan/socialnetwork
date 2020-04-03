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

module.exports.getUserData = id => {
    const q = `SELECT * from users
     WHERE id = $1   
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.generateResetCode = (email, code) => {
    const q = `
        INSERT into password_reset  (email,code)
        VALUES ($1, $2)
        RETURNING *
    `;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.verifySecretCode = email => {
    const q = `
    SELECT code
    FROM password_reset
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1
    `;
    const params = [email];
    return db.query(q, params);
};

module.exports.updatePassword = (password, email) => {
    const q = `
        UPDATE users 
        SET password = $1
        WHERE email = $2
    `;
    const params = [email, password];
    return db.query(q, params);
};

module.exports.addProfilePic = (image_url, id) => {
    const q = `
            UPDATE users 
            SET image_url = $1
            WHERE id = $2
            RETURNING image_url
   `;
    const params = [image_url, id];
    return db.query(q, params);
};

module.exports.updateBiography = (biography, id) => {
    const q = `
            UPDATE users 
            SET biography = $1
            WHERE id = $2
            RETURNING biography
   `;
    const params = [biography, id];
    return db.query(q, params);
};
