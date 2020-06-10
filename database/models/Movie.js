 module.exports = (sequelize, dataTypes) => {
    let alias = "Movies";

    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        /* create_ad:{
            type: dataTypes.DATE,
            allowNull:true
        }, */
        /* update_at:{
            type: dataTypes.DATE,
            allowNull:true
        }, */
        title:{
            type: dataTypes.STRING(500),
            allowNull: false,
        },
        rating:{
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull:false
        },
        awards:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        release_date:{
            type: dataTypes.DATE,
            allowNull: false
        },
        length: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        genre_id:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            reference: {
                model: 'genres',
                key: "id"
            }
        }
    };

    let config = {
        tableName: "movies",
        timestamps: false
    }

    const Movie = sequelize.define(alias, cols, config);

    

    return Movie;
 }