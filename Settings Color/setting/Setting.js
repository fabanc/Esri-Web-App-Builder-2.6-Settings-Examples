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
  'dojo/_base/Color',
  "dojo/on",
  "dijit/_WidgetsInTemplateMixin",
  "jimu/BaseWidgetSetting",
  "jimu/dijit/ColorPickerButton"
],
function(declare, lang, Color, on, _WidgetsInTemplateMixin, BaseWidgetSetting) {

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-demo-setting',

    postMixInProperties:function(){
      this.inherited(arguments);
    },

    postCreate: function(){
      this.inherited(arguments);
      this.setConfig(this.config);
      this.own(
        on(this.colorPicker, 'change', lang.hitch(this, this._onColorChange))
      );
    },

    setConfig: function(config){
       this.config = config;
       this.selectionColor = config.selectionColor;
       if(this.config.selectionColor) {
          this.colorPicker.setColor(new Color(this.selectionColor));
       }
    },

    getConfig: function(){
      //WAB will get config object through this method
      return {
        selectionColor: this.selectionColor
      };
    },

    _onColorChange: function(color) {
      this.selectionColor = color.toHex();
    }

  });
});
