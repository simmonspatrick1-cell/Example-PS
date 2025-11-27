/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/file', 'N/ui/serverWidget', 'N/log'],

function(file, serverWidget, log) {
    
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
            if (context.request.method === 'GET') {
                // Path to the bundled React app files in the File Cabinet
                // Adjust the path based on where the build files are stored after deployment
                var buildFolderPath = '/SuiteScripts/entity-manager/build/';
                
                // Load the main index.html file
                var indexFile = file.load({
                    id: buildFolderPath + 'index.html'
                });
                
                var indexContent = indexFile.getContents();
                
                // Modify the content to adjust paths if necessary
                // Since the app assumes it's hosted at root '/', we may need to adjust static file paths
                // For simplicity, assuming the build is configured to work at root or paths are relative
                // If paths need adjustment, uncomment and modify the following:
                // indexContent = indexContent.replace(/\/static\//g, buildFolderPath + 'static/');
                
                // Write the HTML content to the response
                context.response.write(indexContent);
                
                log.debug({
                    title: 'React Suitelet Served',
                    details: 'Successfully served index.html for React app from ' + buildFolderPath
                });
            } else {
                // Handle other request methods if needed
                context.response.write('Method Not Allowed');
                context.response.setHeader({
                    name: 'HTTP/1.1',
                    value: '405 Method Not Allowed'
                });
                
                log.error({
                    title: 'Invalid Request Method',
                    details: 'Request method ' + context.request.method + ' not supported.'
                });
            }
        } catch (e) {
            log.error({
                title: 'Error in Suitelet',
                details: e.toString()
            });
            context.response.write('An error occurred while loading the application: ' + e.toString());
        }
    }

    return {
        onRequest: onRequest
    };
    
});
