module.exports = (sequelize, DataTypes) => {
    // Table Users
    return sequelize.define('Users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            msg: 'Le nom d\'utilisateur est déjà pris.'
          },
          validate: {
            len: {
              args: [3, 25],
              msg: 'Le nom d\'utilisateur doit contenir entre 3 et 25 caractères.'
            },
            notEmpty: { msg: 'Le nom d\'utilisateur ne peut pas être vide.' },
            notNull: { msg: 'Le nom d\'utilisateur est une propriété requise.'}
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            msg: 'L\'adresse email est déjà utilisée.'
          },
          validate: {
            isEmail: { msg: 'Veuillez entrer une adresse email valide.' },
            notEmpty: { msg: 'L\'adresse email ne peut pas être vide.' },
            notNull: { msg: 'L\'adresse email est une propriété requise.'}
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: { msg: 'Le mot de passe ne peut pas être vide.' },
            notNull: { msg: 'Le mot de passe est une propriété requise.'}
          }
        },
        role: {
          type: DataTypes.ENUM('student', 'admin', 'teacher'),
          defaultValue: 'student'
        }
      }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
      })
    }