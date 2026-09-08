import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './users/Entity/user.entity';

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserEntity],
    synchronize: true,
});

async function createAdmin() {
    const [, , email, password, name = 'Admin', lastname = 'AIDSSH'] = process.argv;

    if (!email || !password) {
        console.error('Usage: npm run create-admin -- <email> <password> [name] [lastname]');
        process.exit(1);
    }

    await dataSource.initialize();
    const userRepository = dataSource.getRepository(UserEntity);

    const existing = await userRepository.findOne({ where: { email } });
    if (existing) {
        await userRepository.update(existing.id, { role: 'admin' });
        console.log(`User ${email} already existed — promoted to admin.`);
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userRepository.save({ email, password: hashedPassword, name, lastname, role: 'admin' });
        console.log(`Admin user ${email} created.`);
    }

    await dataSource.destroy();
}

createAdmin().catch((error) => {
    console.error('Failed to create admin:', error);
    process.exit(1);
});
