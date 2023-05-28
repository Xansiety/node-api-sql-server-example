import { config } from 'dotenv';
config();

console.log(process.env.NAME);

export default {
    port: 4000
}