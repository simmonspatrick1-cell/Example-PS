/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/file', 'N/log', 'N/record', 'N/search'],

function(file, log, record, search) {

    /**
     * Get File Cabinet URL for a file path
     */
    function getFileCabinetUrl(filePath) {
        try {
            var fileObj = file.load({
                id: filePath
            });
            return fileObj.url;
        } catch (e) {
            log.error({
                title: 'Error loading file',
                details: 'Path: ' + filePath + ', Error: ' + e.toString()
            });
            return null;
        }
    }

    /**
     * Handle API requests for entity data
     */
    function handleApiRequest(context) {
        try {
            var entityType = context.request.parameters.entity;

            context.response.setHeader({
                name: 'Content-Type',
                value: 'application/json'
            });

            if (entityType === 'customers') {
                var customerSearch = search.create({
                    type: search.Type.CUSTOMER,
                    columns: ['internalid', 'companyname', 'email', 'phone'],
                    filters: []
                });
                var searchResults = customerSearch.run().getRange({ start: 0, end: 100 });
                var customers = searchResults.map(function(result) {
                    return {
                        id: result.getValue('internalid'),
                        companyName: result.getValue('companyname'),
                        email: result.getValue('email'),
                        phone: result.getValue('phone'),
                        address: ''
                    };
                });
                context.response.write(JSON.stringify({
                    success: true,
                    data: customers
                }));
            } else if (entityType === 'items') {
                var itemSearch = search.create({
                    type: search.Type.ITEM,
                    columns: ['internalid', 'itemid', 'displayname', 'salesdescription', 'cost'],
                    filters: []
                });
                var searchResults = itemSearch.run().getRange({ start: 0, end: 100 });
                var items = searchResults.map(function(result) {
                    return {
                        id: result.getValue('internalid'),
                        itemId: result.getValue('itemid'),
                        displayName: result.getValue('displayname'),
                        description: result.getValue('salesdescription'),
                        cost: parseFloat(result.getValue('cost')) || 0
                    };
                });
                context.response.write(JSON.stringify({
                    success: true,
                    data: items
                }));
            } else if (entityType === 'projects') {
                var projectSearch = search.create({
                    type: 'job',
                    columns: ['internalid', 'entityid', 'companyname', 'entitystatus', 'startdate', 'enddate'],
                    filters: []
                });
                var searchResults = projectSearch.run().getRange({ start: 0, end: 100 });
                var projects = searchResults.map(function(result) {
                    return {
                        id: result.getValue('internalid'),
                        name: result.getValue('entityid') || result.getValue('companyname'),
                        status: result.getValue('entitystatus') || 'Unknown',
                        customer: result.getValue('companyname') || 'N/A',
                        startDate: result.getValue('startdate') || 'N/A',
                        endDate: result.getValue('enddate') || 'N/A'
                    };
                });
                context.response.write(JSON.stringify({
                    success: true,
                    data: projects
                }));
            } else if (entityType === 'estimates') {
                var estimateSearch = search.create({
                    type: search.Type.ESTIMATE,
                    columns: ['internalid', 'tranid', 'entity', 'total', 'status', 'trandate'],
                    filters: []
                });
                var searchResults = estimateSearch.run().getRange({ start: 0, end: 100 });
                var estimates = searchResults.map(function(result) {
                    return {
                        id: result.getValue('internalid'),
                        estimateNumber: result.getValue('tranid'),
                        customer: result.getValue('entity'),
                        total: parseFloat(result.getValue('total')) || 0,
                        status: result.getValue('status') || 'Pending',
                        date: result.getValue('trandate')
                    };
                });
                context.response.write(JSON.stringify({
                    success: true,
                    data: estimates
                }));
            } else if (entityType === 'projecttasks') {
                var taskSearch = search.create({
                    type: 'projecttask',
                    columns: ['internalid', 'title', 'company', 'status', 'startdate', 'enddate'],
                    filters: []
                });
                var searchResults = taskSearch.run().getRange({ start: 0, end: 100 });
                var tasks = searchResults.map(function(result) {
                    return {
                        id: result.getValue('internalid'),
                        title: result.getValue('title'),
                        company: result.getValue('company'),
                        status: result.getValue('status'),
                        percentComplete: 0,
                        startDate: result.getValue('startdate'),
                        endDate: result.getValue('enddate')
                    };
                });
                context.response.write(JSON.stringify({
                    success: true,
                    data: tasks
                }));
            } else if (entityType === 'purchaseorders') {
                var poSearch = search.create({
                    type: search.Type.PURCHASE_ORDER,
                    columns: ['internalid', 'tranid', 'entity', 'total', 'status', 'trandate'],
                    filters: []
                });
                var searchResults = poSearch.run().getRange({ start: 0, end: 100 });
                var purchaseOrders = searchResults.map(function(result) {
                    return {
                        id: result.getValue('internalid'),
                        poNumber: result.getValue('tranid'),
                        vendor: result.getValue('entity'),
                        total: parseFloat(result.getValue('total')) || 0,
                        status: result.getValue('status') || 'Pending',
                        date: result.getValue('trandate')
                    };
                });
                context.response.write(JSON.stringify({
                    success: true,
                    data: purchaseOrders
                }));
            } else {
                context.response.write(JSON.stringify({
                    success: false,
                    message: 'Unsupported entity type'
                }));
            }
        } catch (e) {
            log.error({
                title: 'API Error',
                details: e.toString()
            });
            context.response.write(JSON.stringify({
                success: false,
                message: 'Error: ' + e.toString()
            }));
        }
    }

    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
        try {
            // Check if this is an API request (has entity parameter)
            var entityParam = context.request.parameters.entity;

            if (entityParam) {
                // Handle API request
                handleApiRequest(context);
                return;
            }

            if (context.request.method === 'GET' && !entityParam) {
                // Path to the bundled React app files in the File Cabinet
                var buildFolderPath = '/Suitelet/ReactApp/entity-manager/build';

                // Load the main index.html file
                var indexFile = file.load({
                    id: buildFolderPath + '/index.html'
                });

                var indexContent = indexFile.getContents();

                // Get File Cabinet URLs for static assets
                var jsFileUrl = getFileCabinetUrl(buildFolderPath + '/static/js/main.604b35ad.js');
                var cssFileUrl = getFileCabinetUrl(buildFolderPath + '/static/css/main.9f828705.css');
                var faviconUrl = getFileCabinetUrl(buildFolderPath + '/favicon.ico');
                var logo192Url = getFileCabinetUrl(buildFolderPath + '/logo192.png');
                var manifestUrl = getFileCabinetUrl(buildFolderPath + '/manifest.json');

                log.debug({
                    title: 'File Cabinet URLs',
                    details: 'JS: ' + jsFileUrl + ', CSS: ' + cssFileUrl
                });

                // Replace paths with direct File Cabinet URLs
                if (jsFileUrl) {
                    indexContent = indexContent.replace(
                        '/static/js/main.604b35ad.js',
                        jsFileUrl
                    );
                }
                if (cssFileUrl) {
                    indexContent = indexContent.replace(
                        '/static/css/main.9f828705.css',
                        cssFileUrl
                    );
                }
                if (faviconUrl) {
                    indexContent = indexContent.replace(
                        '/favicon.ico',
                        faviconUrl
                    );
                }
                if (logo192Url) {
                    indexContent = indexContent.replace(
                        '/logo192.png',
                        logo192Url
                    );
                }
                if (manifestUrl) {
                    indexContent = indexContent.replace(
                        '/manifest.json',
                        manifestUrl
                    );
                }

                // Write the modified HTML content to the response
                context.response.write(indexContent);

                log.debug({
                    title: 'React Suitelet Served',
                    details: 'Successfully served index.html with File Cabinet URLs'
                });
            } else if (context.request.method === 'POST' && entityParam) {
                // Handle create operations
                handleCreateRequest(context);
            } else if (context.request.method === 'PUT' && entityParam) {
                // Handle update operations
                handleUpdateRequest(context);
            } else if (context.request.method === 'DELETE' && entityParam) {
                // Handle delete operations
                handleDeleteRequest(context);
            } else {
                // Handle unsupported methods
                context.response.write('Method Not Allowed');

                log.error({
                    title: 'Invalid Request Method',
                    details: 'Request method ' + context.request.method + ' not supported for entity: ' + entityParam
                });
            }
        } catch (e) {
            log.error({
                title: 'Error in Suitelet',
                details: e.toString()
            });
            context.response.write('An error occurred while loading the application: ' + JSON.stringify(e));
        }
    }

    /**
     * Handle CREATE requests for entities
     */
    function handleCreateRequest(context) {
        try {
            var entityType = context.request.parameters.entity;
            var body = context.request.body ? JSON.parse(context.request.body) : {};

            context.response.setHeader({
                name: 'Content-Type',
                value: 'application/json'
            });

            log.debug({
                title: 'Create Request',
                details: 'Entity: ' + entityType + ', Data: ' + JSON.stringify(body)
            });

            if (entityType === 'customers') {
                var customerRec = record.create({
                    type: record.Type.CUSTOMER,
                    isDynamic: true
                });
                customerRec.setValue({
                    fieldId: 'companyname',
                    value: body.companyName || 'New Customer'
                });
                customerRec.setValue({
                    fieldId: 'email',
                    value: body.email || ''
                });
                customerRec.setValue({
                    fieldId: 'phone',
                    value: body.phone || ''
                });
                var customerId = customerRec.save();
                context.response.write(JSON.stringify({
                    success: true,
                    message: 'Customer created successfully',
                    id: customerId
                }));
            } else {
                context.response.write(JSON.stringify({
                    success: false,
                    message: 'Unsupported entity type for creation: ' + entityType
                }));
            }
        } catch (e) {
            log.error({
                title: 'Create Error',
                details: e.toString()
            });
            context.response.write(JSON.stringify({
                success: false,
                message: 'Error creating entity: ' + e.toString()
            }));
        }
    }

    /**
     * Handle UPDATE requests for entities
     */
    function handleUpdateRequest(context) {
        try {
            var entityType = context.request.parameters.entity;
            var body = context.request.body ? JSON.parse(context.request.body) : {};
            var entityId = body.id;

            context.response.setHeader({
                name: 'Content-Type',
                value: 'application/json'
            });

            log.debug({
                title: 'Update Request',
                details: 'Entity: ' + entityType + ', ID: ' + entityId + ', Data: ' + JSON.stringify(body)
            });

            if (!entityId) {
                context.response.write(JSON.stringify({
                    success: false,
                    message: 'Entity ID is required for update'
                }));
                return;
            }

            if (entityType === 'customers') {
                var customerRec = record.load({
                    type: record.Type.CUSTOMER,
                    id: entityId,
                    isDynamic: true
                });
                if (body.companyName) {
                    customerRec.setValue({
                        fieldId: 'companyname',
                        value: body.companyName
                    });
                }
                if (body.email) {
                    customerRec.setValue({
                        fieldId: 'email',
                        value: body.email
                    });
                }
                if (body.phone) {
                    customerRec.setValue({
                        fieldId: 'phone',
                        value: body.phone
                    });
                }
                var customerId = customerRec.save();
                context.response.write(JSON.stringify({
                    success: true,
                    message: 'Customer updated successfully',
                    id: customerId
                }));
            } else {
                context.response.write(JSON.stringify({
                    success: false,
                    message: 'Unsupported entity type for update: ' + entityType
                }));
            }
        } catch (e) {
            log.error({
                title: 'Update Error',
                details: e.toString()
            });
            context.response.write(JSON.stringify({
                success: false,
                message: 'Error updating entity: ' + e.toString()
            }));
        }
    }

    /**
     * Handle DELETE requests for entities
     */
    function handleDeleteRequest(context) {
        try {
            var entityType = context.request.parameters.entity;
            var body = context.request.body ? JSON.parse(context.request.body) : {};
            var entityId = body.id;

            context.response.setHeader({
                name: 'Content-Type',
                value: 'application/json'
            });

            log.debug({
                title: 'Delete Request',
                details: 'Entity: ' + entityType + ', ID: ' + entityId
            });

            if (!entityId) {
                context.response.write(JSON.stringify({
                    success: false,
                    message: 'Entity ID is required for deletion'
                }));
                return;
            }

            if (entityType === 'customers') {
                record.delete({
                    type: record.Type.CUSTOMER,
                    id: entityId
                });
                context.response.write(JSON.stringify({
                    success: true,
                    message: 'Customer deleted successfully',
                    id: entityId
                }));
            } else {
                context.response.write(JSON.stringify({
                    success: false,
                    message: 'Unsupported entity type for deletion: ' + entityType
                }));
            }
        } catch (e) {
            log.error({
                title: 'Delete Error',
                details: e.toString()
            });
            context.response.write(JSON.stringify({
                success: false,
                message: 'Error deleting entity: ' + e.toString()
            }));
        }
    }

    return {
        onRequest: onRequest
    };
    
});
