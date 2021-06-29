import {
    intArg,
    makeSchema,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
    asNexusMethod,
    enumType, booleanArg,
} from 'nexus'
import {DateTimeResolver} from 'graphql-scalars'
import {Context} from './context'
import {AuthenticationError} from 'apollo-server-express';

import Mutations from './mutations';


export const DateTime = asNexusMethod(DateTimeResolver, 'date')
const jwt = require("jsonwebtoken");

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allUsers', {
            type: 'User',
            resolve: (_parent, _args, context: Context) => {
                return context.prisma.user.findMany()
            },
        })

        t.nullable.field('userById', {
            type: 'User',
            args: {
                id: nonNull(intArg()),
            },
            resolve: (parentValue, {id}, context) => {
                return context.prisma.user.findUnique({
                    where: {id}
                })
            }
        })

        t.nullable.field('employee', {
            type: 'Employee',
            args: {
                id: intArg(),
            },
            resolve: (parentValue, {id}, context) => {
                return context.prisma.employee.findUnique({
                    where: {id}
                })
            }
        })

        t.list.field('vehicles', {
            type: 'Vehicle',
            resolve: (_parent, args, context: Context) => {
                return context.prisma.vehicle.findMany({})
            },
        })

        t.list.field('employees', {
            type: 'Employee',
            resolve: (_parent, args, {prisma}) => {
                return prisma.employee.findMany({});
            },
        })

        t.list.field('certificates', {
            type: 'Certificate',
            resolve: (_parent, args, {prisma}) => {
                return prisma.certificate.findMany({});
            },
        })

    },
})

const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id')
        t.string('userName')
        t.string('name')
        t.string('lastName')
        t.boolean('admin')
    },
});

const Vacation = objectType({
    name: 'Vacation',
    definition(t) {
        t.int('id')
        t.string('startDate')
        t.string('endDate')
        t.string('description')
    },
});

const Employee = objectType({
    name: 'Employee',
    definition(t) {
        t.nonNull.int('id')
        t.string('firstName')
        t.string('lastName')
        t.string('email')
        t.string('city')
        t.string('adres')
        t.string('houseNumber')
        t.string('postalCode')
        t.string('function')
        t.list.field('certificates', {
            type: 'Certificate',
            resolve: ({id}, _, {prisma}) => {
                return prisma.certificate.findMany({where: {employeeId: id}})
            },
        })
        t.list.field('vacations', {
            type: 'Vacation',
            resolve: ({id}, _, {prisma}) => {
                return prisma.vacation.findMany({where: {employeeId: id}})
            },
        })
    },
})


const Certificate = objectType({
    name: 'Certificate',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('type')
        t.nonNull.string('title')
        t.string('description')
        t.string('location')
        t.string('achievDate')
        t.string('expirationDate')
    },
})

const Vehicle = objectType({
    name: 'Vehicle',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('name')
        t.string('licensePlate')
        t.string('description')
        t.list.field('certificates', {
            type: Certificate,
            resolve: ({id}, args, {prisma}) => {
                return prisma.vehicleCertificate.findMany({where: {vehicleId: id}});
            }
        })
    },
})


export const JwtToken = objectType({
    name: 'JwtToken',
    definition(t) {
        t.nonNull.string('token')
    },
})


export const schema = makeSchema({
    types: [
        Query,
        Mutations,
        User,
        DateTime,
        Employee,
        Certificate,
        Vehicle,
        Vacation,
        JwtToken
    ],

    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
})
