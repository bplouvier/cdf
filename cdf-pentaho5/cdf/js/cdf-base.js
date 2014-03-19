/*!
* Copyright 2002 - 2013 Webdetails, a Pentaho company.  All rights reserved.
* 
* This software was developed by Webdetails and is provided under the terms
* of the Mozilla Public License, Version 2.0, or any later version. You may not use
* this file except in compliance with the license. If you need a copy of the license,
* please go to  http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
*
* Software distributed under the Mozilla Public License is distributed on an "AS IS"
* basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to
* the license for the specific language governing your rights and limitations.
*/

var CDF_PLUGIN_NAME = "pentaho-cdf";
var SAMPLES_BASE_PATH = "/public/plugin-samples/";

var Helper = {

  getTimestamp: function() { return "ts=" + new Date().getTime(); },

  getFullPath: function( path, action ) {

    path = path || "";
    action = action || "";

    var fullPath = path.indexOf( CDF_PLUGIN_NAME ) == 0 ? ( SAMPLES_BASE_PATH + path ) : path;
    fullPath = fullPath + ( action ? "/" + action : "" ).replace(/\/\//g, '/');

    return fullPath;
  }   
};

var Endpoints = {

  // Dashboards.Startup.js determines webAppPath
  getWebapp: function () { return webAppPath; },

  getXmla: function () { return Endpoints.getWebapp() + "/Xmla"; },

  getPluginBase: function( plugin ) { return Endpoints.getWebapp() + "/plugin/" + plugin + "/api"; },

  getCdfBase: function () { return Endpoints.getPluginBase( CDF_PLUGIN_NAME ); },

  getCdaBase: function () { return Endpoints.getPluginBase('cda'); },

  getPluginEndpoint: function( plugin, endpoint ) { return Endpoints.getPluginBase(plugin) + "/" + endpoint; },

  getStorage: function ( action ) { return Endpoints.getCdfBase() + "/storage/"  + action; },

  getSettings: function ( action ) { return Endpoints.getCdfBase() + "/settings/" + action; },

  getViewAction: function () { return Endpoints.getCdfBase() + "/viewAction"; },

  getJSONSolution: function () { return Endpoints.getCdfBase() + "/getJSONSolution"; },

  getRenderHTML: function () { return Endpoints.getCdfBase() + "/RenderHtml"; },

  getExport: function () { return Endpoints.getCdfBase() + "/Export"; },

  getResource: function() { return Endpoints.getCdfBase() + "/resources"; },

  getCdfXaction: function( path, action, solution ) { 
    return Endpoints.getViewAction() + "?path=" + Helper.getFullPath( path, action ) + "&" + Helper.getTimestamp(); 
  },

  getServiceAction: function( method, solution, path, action ) { 

    var arr = {};
    arr.wrapper = false;
    arr.action = action;
    arr.url = Endpoints.getWebapp() + "/api/repos/" + Helper.getFullPath( path, action ).replace(/\//g, ":") + "/generatedContent";

    return arr; 
  }, 

  getComments: function ( action ) { 

  	var endpoint = "";

  	if( action == "LIST_ALL" || action == "LIST_ACTIVE" || action == "GET_LAST" ) {
      endpoint = "list";
    
    } else if( action == "DELETE_COMMENT" ) {
      endpoint = "delete";
    
    } else if( action == "ARCHIVE_COMMENT" ) {
      endpoint = "archive";
      
    } else if( action == "ADD_COMMENT" ) {
      endpoint = "add";
    }

  	return Endpoints.getCdfBase() + "/comments/" + endpoint;
  },

  getScheduledJob: function() { return Endpoints.getWebapp() + "/api/scheduler/job"; },

  getEmailConfig: function() { return Endpoints.getWebapp() + "/api/emailconfig"; },

  getPivot: function ( solution, path, action ) { return Endpoints.getWebapp() + "/Pivot?solution=" + (solution || "system") + "&path=" + path + "&action=" + action; },

  getAnalyzer: function() { return Endpoints.getWebapp() + "/content/analyzer/"; },

  getReportViewer: function( path, ts ) { return Endpoints.getWebapp() + '/api/repos/' + path + '/viewer?' + ts; }
  
};