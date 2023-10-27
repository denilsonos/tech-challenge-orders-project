export const createClientSwagger = () => ({
    schema: {
        tags: ['Client'],
        body: {
            type: 'object',
            properties: {
                cpf: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            },
            409: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const getAllClientSwagger = () => ({
    schema: {
        tags: ['Client'],
        response: {
            200: {
                type: 'object',
                properties: {
                    clients: {
                        type: 'array',
                        properties: {
                            cpf: { type: 'string' },
                            email: { type: 'string' },
                            name: { type: 'string' },
                            id: { type: 'number' },
                        }
                    }
                }
            }
        }
    }
});

export const getByParamClientSwagger = () => ({
    schema: {
        tags: ['Client'],
        params: {
            identifier: { type: 'string' }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    client: {
                        type: 'object',
                        properties: {
                            cpf: { type: 'string' },
                            email: { type: 'string' },
                            name: { type: 'string' },
                            id: { type: 'number' },
                        }
                    }
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const createItemSwagger = () => ({
    schema: {
        tags: ['Item'],
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                category: { type: 'string' },
                value: { type: 'number' },
                image: { type: 'string' },
            },
        },
    }
})

export const findItemSwagger = () => ({
    schema: {
        tags: ['Item'],
        query: {
            category: { type: 'string' }
        },
    }
})

export const getItemSwagger = () => ({
    schema: {
        tags: ['Item'],
        params: {
            id: { type: 'string' }
        },
    }
})

export const deleteItemSwagger = () => ({
    schema: {
        tags: ['Item'],
    }
})

export const updateItemSwagger = () => ({
    schema: {
        tags: ['Item'],
    }
})

export const createOrderSwagger = () => ({
    schema: {
        tags: ['Order'],
        body: {
            type: 'object',
            properties: {
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            itemId: { type: 'number' },
                            quantity: { type: 'number' },
                        }
                    }
                },

            }
        },
    }
})

export const getOrderSwagger = () => ({
    schema: {
        tags: ['Order'],
        params: {
            id: { type: 'string' }
        },
    }
})

export const findOrderSwagger = () => ({
    schema: {
        tags: ['Order'],
        query: {
            clientId: { type: 'string' }
        },
    }
})
