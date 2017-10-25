///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2017 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
//Examples taken from the Search Widget
define([
  'dojo/_base/declare',
  "dojo/_base/lang",
  "jimu/BaseWidgetSetting",
  "jimu/dijit/CheckBox"
],
function(declare, lang, BaseWidgetSetting, CheckBox) {

  return declare([BaseWidgetSetting], {
    baseClass: 'jimu-widget-demo-setting',

    postMixInProperties:function(){
      this.inherited(arguments);
    },

    postCreate: function(){
      this.inherited(arguments);

      //Create the checkbox
      this.allowExportCheckBox = new CheckBox({
          label: this.nls.allowExport,
          checked: this.config && this.config.booleanValue,
          onChange: lang.hitch(this, this._onAllowExportChange)
      }, this.exportCheckBoxDiv);


      this.setConfig(this.config);
    },

    //Configuration Override
    setConfig: function(config){
       this.config = config;
       this.allowExport = this.config.booleanValue;
       this.allowExportCheckBox.setValue(this.allowExport);
    },

    getConfig: function(){
      //WAB will get config object through this method
      return {
        booleanValue: this.allowExport
      };
    },

    _onAllowExportChange: function(checked) {
      this.allowExport = checked;
    }


  });
});
