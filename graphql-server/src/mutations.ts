import {intArg, nonNull, objectType, stringArg} from "nexus";
import {Context} from "./context";
import {AuthenticationError} from "apollo-server-express";
import {JwtToken} from "./schema";

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

export default objectType({
    name: 'Mutation',
    definition(t) {
        t.field('login', {
            type: JwtToken,
            args: {
                userName: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (_, {userName, password}, context: Context) => {
                console.log(userName, password);
                const user = await context.prisma.user.findUnique({where: {userName}});
                if (user) {
                    const match = await bcrypt.compare(password, user.password);
                    if (match) {
                        const {userName, name, admin, id} = user;
                        return {
                            token: jwt.sign(
                                {user: {userName, name, admin}},
                                process.env.JWT_SECRET,
                                {algorithm: "HS256", subject: String(id), expiresIn: "1w"}
                            )
                        }
                    }
                }
                throw new AuthenticationError('Invalid credentials');

            },
        });
        t.field('register', {
            type: 'User',
            args: {
                userName: nonNull(stringArg()),
                password: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                name: nonNull(stringArg()),
            },
            resolve: async (_, {userName, password, name, lastName}, {prisma}) => {
                const hash = await bcrypt.hash(password, saltRounds);
                if (hash) {
                    return prisma.user.create({
                        data: {
                            userName,
                            password: hash,
                            name,
                            lastName
                        }
                    })
                }
            },
        });

        t.field('createVehicle', {
            type: 'Vehicle',
            args: {
                name: nonNull(stringArg()),
                licensePlate: stringArg(),
                description: nonNull(stringArg()),
            },
            resolve: (_, {name, licensePlate, description}, context: Context) => {
                return context.prisma.vehicle.create({
                    data: {
                        name,
                        licensePlate,
                        description,
                    },
                })
            },
        });

        t.field('addEmployee', {
            type: 'Employee',
            args: {
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                email: nonNull(stringArg()),
                city: nonNull(stringArg()),
                adres: nonNull(stringArg()),
                houseNumber: nonNull(stringArg()),
                postalCode: nonNull(stringArg()),
                function: nonNull(stringArg()),
            },
            resolve: (_, args, context: Context) => {
                const user = context['user'];
                if (user) {
                    const data = args
                    return context.prisma.employee.create({data})
                }
            },
        });

        t.field('updateEmployee', {
            type: 'Employee',
            args: {
                id: nonNull(intArg()),
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                email: nonNull(stringArg()),
                city: nonNull(stringArg()),
                adres: nonNull(stringArg()),
                houseNumber: nonNull(stringArg()),
                postalCode: nonNull(stringArg()),
                function: nonNull(stringArg()),
            },
            resolve: (_, args, context: Context) => {
                const user = context['user'];
                if (user) {
                    const data = args
                    const {id} = args;
                    delete args.id; // todo check if needed
                    return context.prisma.employee.update({where: {id}, data})
                }
            },
        });

        t.field('deleteEmployee', {
            type: 'Employee',
            args: {
                id: nonNull(intArg()),
            },
            resolve: (_, {id}, context: Context) => {
                const user = context['user'];
                if (user) {
                    return context.prisma.employee.delete({where: {id}})
                }
            },
        });

        t.field('addCertificate', {
            type: 'Certificate',
            args: {
                title: nonNull(stringArg()),
                type: nonNull(stringArg()),
                location: nonNull(stringArg()),
                achievDate: nonNull(stringArg()),
                expirationDate: nonNull(stringArg()),
                employeeId: nonNull(intArg()),
            },
            resolve: (_, args, context: Context) => {
                const user = context['user'];
                console.log('hello')
                if (user) {
                    const data = args
                    console.log(data);
                    return context.prisma.certificate.create({data})
                }
            },
        });

        t.field('addVacation', {
            type: 'Vacation',
            args: {
                description: nonNull(stringArg()),
                startDate: nonNull(stringArg()),
                endDate: nonNull(stringArg()),
                employeeId: nonNull(intArg()),
            },
            resolve: (_, args, context: Context) => {
                const user = context['user'];
                if (user) {
                    const data = args
                    return context.prisma.vacation.create({data})
                }
            },
        });

        t.field('deleteVacation', {
            type: 'Vacation',
            args: {
                id: nonNull(intArg()),
            },
            resolve: (_, {id}, context: Context) => {
                const user = context['user'];
                if (user) {
                    return context.prisma.vacation.delete({where: {id}})
                }
            },
        });

    },
})
