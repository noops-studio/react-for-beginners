import { Sequelize } from "sequelize-typescript";
import config from 'config'

console.log([__dirname + '/models'])
const sequelize = new Sequelize({
    ...config.get('postgres'),
    models: [__dirname + '/models']
});
sequelize.sync()

export default sequelize;

/*
docker run --name postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=social -p 5432:5432 -d postgres
*/
