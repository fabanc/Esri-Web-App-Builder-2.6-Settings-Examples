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

define([
  'dojo/_base/declare',
  "dojo/_base/lang",
  "dojo/Deferred",
  "jimu/BaseWidgetSetting",
  'dijit/_WidgetsInTemplateMixin',
  "jimu/portalUtils",
  'esri/units',
  'dojo/on',
  "dijit/Tooltip",
  "dijit/form/Select"
],
function(
  declare,
  lang,
  Deferred,
  BaseWidgetSetting,
  _WidgetsInTemplateMixin,
  PortalUtils,
  esriUnits,
  on,
  Tooltip
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-demo-setting',

    startup: function(){
      this.inherited(arguments);
      if (!this.config.measurement) {
        this.config.measurement = {};
      }
      Tooltip.position = "below";
      this._initShowToolItem(this.showDistance);
      this.setConfig(this.config);
    },

    //Configuration Override
    setConfig: function(config){
      this.config = config;
      this._processConfig(config).then(lang.hitch(this, function(configJson) {
       if (configJson.measurement.defaultLengthUnit) {
         this.selectLengthUnit.set('value', configJson.measurement.defaultLengthUnit);
       } else {
         this.selectLengthUnit.set('value', "esriMiles");
       }
      }));
    },

    getConfig: function(){
      //WAB will get config object through this method
      this.config.measurement.defaultLengthUnit = this.selectLengthUnit.value;
      return this.config;;
    },

    //Private method
    _processConfig: function(configJson) {
      var def = new Deferred();
      if (configJson.defaultLengthUnit) {
        def.resolve(configJson);
      } else {
        PortalUtils.getUnits(this.appConfig.portalUrl).then(lang.hitch(this, function(units) {
          configJson.defaultLengthUnit = units === 'english' ?
            esriUnits.MILES : esriUnits.KILOMETERS;
          def.resolve(configJson);
        }));
      }

      return def.promise;
    },

    _initShowToolItem: function(item) {
      if (item) {
        item.setValue(true);
        this._showToolsItems.push(item);
        this.own(on(item, 'change', lang.hitch(this, this._onShowToolItemsChange, item)));
      }
    },

    _onShowToolItemsChange: function(obj) {
      if (obj) {
        if (false === obj.checked && this._isItemsAllHide()) {
          obj.check();
          Tooltip.hide();
          Tooltip.show(this.nls.allHidedTips, obj.domNode);
          this.own(on.once(obj.domNode, mouse.leave,
            lang.hitch(this, function() {
              Tooltip.hide(obj.domNode);
            }))
          );
        }
      }
    }
  });
});
