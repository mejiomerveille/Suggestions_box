module.exports = (sequelize, DataTypes) => {
    // Table Votes
    return sequelize.define('Votes', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        suggestion_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Suggestions',
            key: 'id'
          }
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
      }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
      })
    }