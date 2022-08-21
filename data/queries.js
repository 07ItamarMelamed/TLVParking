const { pool } = require("./database");

const queryUpdate = async (p) => {
    //await pool.connect();
    await pool.query(`UPDATE parkings.t_parkings SET id = $1, x_coord = $2, y_coord = $3, address = $4, time = $5 WHERE id = $1`, [p.id, p.x_coord, p.y_coord, p.address, p.time]);
  }
  
  const queryGet = async () => {
    //await pool.connect();
    return await pool.query('SELECT * FROM parkings.t_parkings')
    .then((res) => {
        console.log(res.rows);
        return res.rows;
    }).catch((err) => {
        console.log(err);
    });
  }
  
  const queryInsert = async (p) => {
    //await pool.connect();
    await pool.query(`INSERT INTO parkings.t_parkings(id, x_coord, y_coord, address, time) VALUES($1, $2, $3, $4, $5) RETURNING *`, [p.id, p.x_coord, p.y_coord, p.address, p.time]);
  }
  
  const queryGetById = async (id) => {
    //await pool.connect();
    return await pool.query(`SELECT * FROM parkings.t_parkings WHERE id = $1`, [id])
    .then((res) => {
        console.log(res.rows[0]);
        return res.rows[0];
    }).catch((err) => {
        console.log(err);
    });
  }
  
  const queryDeleteById = async (id) => {
    //await pool.connect();
    await pool.query(`DELETE FROM parkings.t_parkings WHERE id = $1`, [id]);
  }

  module.exports = {
    queryUpdate,
    queryGet,
    queryInsert,
    queryGetById,
    queryDeleteById
  };