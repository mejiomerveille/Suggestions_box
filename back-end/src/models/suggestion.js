module.exports = (sequelize, DataTypes) => {
  // Table Suggestions
  return sequelize.define('Suggestions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'La suggestion ne peut pas être vide.' },
          notNull: { msg: 'La suggestion est une propriété requise.'}
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      nombre_de_votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les likes.' },
        }
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: 'updated'
    })

  };