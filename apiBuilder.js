/*
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */


"use strict";
(function(window, builder)
{
	/**
	 * Base class
	 * @global
	 * @class
	 * @name Api
	 */
	var Api = window["Asc"]["asc_docs_api"] || window["Asc"]["spreadsheet_api"];

	/**
	 * Checkbox form properties.
	 * @typedef {Object} CheckBoxFormPr
	 * @property {string} Key
	 * @property {string} Tip
	 * @property {boolean} Required
	 */

	/**
	 * Checkbox form properties.
	 * @typedef {Object} FormPr
	 * @property {string} Key
	 * @property {string} Tip
	 * @property {boolean} Required
	 * @property {string} Placeholder
	 */

	/**
	 * Checkbox form properties.
	 * @typedef {Object} PicFormPr
	 * @property {string} Key
	 * @property {string} Tip
	 * @property {boolean} Required
	 * @property {string} Placeholder
	 * @property {ScaleCase} Scale
	 */

	/**
	 * Condition when to scale image.
	 * @typedef {"always" | "never" | "tooBig" | "tooSmall"} ScaleCase
	 */

	/**
	 * Creates the checkbox (or radiobutton) form.
	 * @memberof Api
	 * @param {CheckBoxFormPr} [oFormPr={Key: "", Tip: "", Required: false}] - checkbox(radiobutton) form properties.
	 * @param {boolean} [isRadioButton=false] - indicates whether radiobutton form will be created.
	 * @returns {ApiCheckBoxForm}
	 */
	Api.prototype.CreateCheckBoxForm = function(oFormPr, isRadioButton)
	{
		if (!oFormPr)
			oFormPr = {};

		oFormPr["Placeholder"] = undefined;
		if (isRadioButton === true)
		{
			oFormPr["GroupKey"] = oFormPr["Key"] && typeof(oFormPr["Key"]) === "string" && oFormPr["Key"] !== "" ? oFormPr["Key"] : "Group 1";
			oFormPr["Key"] = undefined;
		}
		else
		{
			oFormPr["Key"] = oFormPr["Key"] && typeof(oFormPr["Key"]) === "string" && oFormPr["Key"] !== "" ? oFormPr["Key"] : undefined;
			oFormPr["GroupKey"] = undefined;
		}

		var oCC;
		var oCheckboxPr  = new AscCommon.CSdtCheckBoxPr();
		if (oFormPr["GroupKey"])
		{
			oCheckboxPr.CheckedSymbol   = 0x25C9;
			oCheckboxPr.UncheckedSymbol = 0x25CB;
			oCheckboxPr.GroupKey        = oFormPr["GroupKey"];
		}
		else
		{
			oCheckboxPr.CheckedSymbol   = 0x2611;
			oCheckboxPr.UncheckedSymbol = 0x2610;
		}

		oCheckboxPr.CheckedFont = "Segoe UI Symbol";
		oCheckboxPr.UncheckedFont = "Segoe UI Symbol";

		var nCheckedSymbol   = oCheckboxPr && oCheckboxPr.CheckedSymbol ? oCheckboxPr.CheckedSymbol : Asc.c_oAscSdtCheckBoxDefaults.CheckedSymbol;
		var nUncheckedSymbol = oCheckboxPr && oCheckboxPr.UncheckedSymbol ? oCheckboxPr.UncheckedSymbol : Asc.c_oAscSdtCheckBoxDefaults.UncheckedSymbol;
		var sCheckedFont     = oCheckboxPr && oCheckboxPr.CheckedFont ? oCheckboxPr.CheckedFont : Asc.c_oAscSdtCheckBoxDefaults.CheckedFont;
		var sUncheckedFont   = oCheckboxPr && oCheckboxPr.UncheckedFont ? oCheckboxPr && oCheckboxPr.UncheckedFont : Asc.c_oAscSdtCheckBoxDefaults.UncheckedFont;

		var isLoadFonts = false;
		if (!AscCommon.IsAscFontSupport(sCheckedFont, nCheckedSymbol))
		{
			isLoadFonts = true;
			AscFonts.FontPickerByCharacter.getFontBySymbol(nCheckedSymbol);
		}

		if (!AscCommon.IsAscFontSupport(sUncheckedFont, nUncheckedSymbol))
		{
			isLoadFonts = true;
			AscFonts.FontPickerByCharacter.getFontBySymbol(nUncheckedSymbol);
		}

		function private_PerformAddCheckBox()
		{
			oCC = private_CreateCommonForm(oFormPr);
			oCC.ApplyCheckBoxPr(oCheckboxPr);
		}

		if (isLoadFonts)
		{
			var oFonts = {};
			oFonts[sCheckedFont]   = true;
			oFonts[sUncheckedFont] = true;

			AscCommon.Check_LoadingDataBeforePrepaste(this, oFonts, {}, private_PerformAddCheckBox);
		}
		else
		{
			private_PerformAddCheckBox();
		}

		return new AscBuilder.ApiCheckBoxForm(oCC);
	};

	/**
	 * Creates the text form.
	 * @memberof Api
	 * @param {FormPr} [oFormPr={Key: "", Tip: "", Required: false}] - form properties.
	 * @returns {ApiTextForm}
	 */
	Api.prototype.CreateTextForm = function(oFormPr)
	{
		if (!oFormPr)
			oFormPr = {};

		var oCC = private_CreateCommonForm(oFormPr);
		var oPr = new AscCommon.CSdtTextFormPr();
		oCC.ApplyTextFormPr(oPr);

		return new AscBuilder.ApiTextForm(oCC);
	};

	/**
	 * Creates the combobox (or dropdown) form.
	 * @memberof Api
	 * @param {FormPr} [oFormPr={Key: "", Tip: "", Required: false}] - form properties.
	 * @param {boolean} [isDropDown=false] - indicates whether dropdown form will be created.
	 * @returns {ApiComboBoxForm}
	 */
	Api.prototype.CreateComboBoxForm = function(oFormPr, isDropDown)
	{
		if (!oFormPr)
			oFormPr = {};

		var oPr = new CSdtComboBoxPr();
		oPr.AddItem(AscCommon.translateManager.getValue("Choose an item"), "");

		var oCC = private_CreateCommonForm(oFormPr);

		if (isDropDown === true)
		{
			if (typeof(oFormPr["Placeholder"]) !== "string" || oFormPr["Placeholder"] === "")
			{
				oCC.ApplyDropDownListPr(oPr);
			}
			else
			{
				oCC.SetDropDownListPr(oPr);
				oCC.SelectListItem();
			}
		}
		else
		{
			if (typeof(oFormPr["Placeholder"]) !== "string" || oFormPr["Placeholder"] === "")
			{
				oCC.ApplyComboBoxPr(oPr);
			}
			else
			{
				oCC.SetComboBoxPr(oPr);
				oCC.SelectListItem();
			}
		}

		return new AscBuilder.ApiComboBoxForm(oCC);
	};

	/**
	 * Creates the picture form.
	 * @memberof Api
	 * @param {PicFormPr} [oFormPr={Key: "", Tip: "", Required: false, Scale: "always"}] - picture form properties
	 * @returns {ApiPictureForm}
	 */
	Api.prototype.CreatePictureForm = function(oFormPr)
	{
		if (!oFormPr)
			oFormPr = {};
		
		if (typeof(oFormPr["Placeholder"]) !== "string" || oFormPr["Placeholder"] === "")
			oFormPr["Placeholder"] = AscCommon.translateManager.getValue("Click to load image");

		var oCC = private_CreateCommonForm(oFormPr);
		oCC.ApplyPicturePr(true);
		oCC.ConvertFormToFixed();
		oCC.SetPictureFormPr(new AscCommon.CSdtPictureFormPr());

		var oApiForm = new AscBuilder.ApiPictureForm(oCC);

		if (typeof(oFormPr["Scale"]) === "string" || oFormPr["Scale"] !== "")
			oApiForm.SetPictureScaleCase(oFormPr["Scale"]);

		return oApiForm;
	};

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Private area
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function private_CreateCommonForm(oFormPr)
	{
		if (!oFormPr)
			oFormPr = {};
		
		var oTempFormPr = new AscCommon.CSdtFormPr();
		oTempFormPr.HelpText = oFormPr["Tip"] && typeof(oFormPr["Tip"]) === "string" && oFormPr["Tip"] !== "" ? oFormPr["Tip"] : undefined;
		oTempFormPr.Required = oFormPr["Required"] && typeof(oFormPr["Required"]) === "boolean" ? oFormPr["Required"] : false;
		oTempFormPr.Key = oFormPr["Key"] && typeof(oFormPr["Key"]) === "string" && oFormPr["Key"] !== "" ? oFormPr["Key"] : undefined;

		var oCC = new AscCommonWord.CInlineLevelSdt();
		
		if (typeof(oFormPr["Placeholder"]) === "string" && oFormPr["Placeholder"] !== "")
			oCC.SetPlaceholderText(oFormPr["Placeholder"]);
		else
			oCC.SetPlaceholder(c_oAscDefaultPlaceholderName.Text);

		oCC.ReplaceContentWithPlaceHolder(false);
		oCC.SetFormPr(oTempFormPr);
		oCC.UpdatePlaceHolderTextPrForForm();

		return oCC;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Export
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Api.prototype["CreateTextForm"]     = Api.prototype.CreateTextForm;
	Api.prototype["CreatePictureForm"]  = Api.prototype.CreatePictureForm;
	Api.prototype["CreateCheckBoxForm"] = Api.prototype.CreateCheckBoxForm;	
	Api.prototype["CreateComboBoxForm"] = Api.prototype.CreateComboBoxForm;	

}(window, null));



