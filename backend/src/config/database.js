module.exports = {
  dialect: 'postgres',
  host: '192.168.100.34',
  username: 'postgres',
  password: 'docker',
  databse: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
