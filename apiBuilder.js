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
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Import
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const AscBuilder         = window["AscBuilder"];
	const GetStringParameter = AscBuilder.GetStringParameter;
	const GetBoolParameter   = AscBuilder.GetBoolParameter;
	const GetNumberParameter = AscBuilder.GetNumberParameter;
	const GetArrayParameter  = AscBuilder.GetArrayParameter;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Base class
	 * @global
	 * @class
	 * @name Api
	 */
	var Api = window["Asc"]["asc_docs_api"] || window["Asc"]["spreadsheet_api"];
 
	/**
	 * Form common properties
	 * @typedef {Object} FormPrBase
	 * @property {string} key
	 * @property {string} tip
	 * @property {boolean} required
	 * @property {string} placeholder
	 */

	/**
	 * Text form specific properties
	 * @typedef {Object} TextFormPrBase
	 * @property {boolean} comb
	 * @property {number} maxCharacters
	 * @property {number} cellWidth
	 * @property {boolean} multiLine
	 * @property {boolean} autoFit
	 */

	/**
	 * Checkbox form properties
	 * @typedef {FormPrBase | TextFormPrBase} TextFormPr
	 */
	 
	/**
	 * Checkbox specific properties
	 * @typedef {Object} CheckBoxFormPrBase
	 * @property {boolean} radio
	 */

	/**
	 * Checkbox form properties
	 * @typedef {FormPrBase | CheckBoxFormPrBase} CheckBoxFormPr
	 */

	/**
	 * Combobox specific properties
	 * @typedef {Object} ComboBoxFormPrBase
	 * @property {boolean} editable
	 * @property {boolean} autoFit
	 * @property {Array.<string | Array.<string>>} items
	 */

	/**
	 * Combobox form properties
	 * @typedef {FormPrBase | ComboBoxFormPrBase} ComboBoxFormPr
	 */

	/**
	 * Condition when to scale image.
	 * @typedef {"always" | "never" | "tooBig" | "tooSmall"} ScaleFlag
	 */

	/**
	 * Value from 0 to 100
	 * @typedef {number} percentage
	 */

	/**
	 * Picture form specific properties
	 * @typedef {Object} PictureFormPrBase
	 * @property {ScaleFlag} scaleFlag
	 * @property {boolean} lockAspectRatio
	 * @property {boolean} respectBorders
	 * @property {percentage} shiftX
	 * @property {percentage} shiftY
	 */

	/**
	 * Picture form properties
	 * @typedef {FormPrBase | PictureFormPrBase} PictureFormPr
	 */

	/**
	 * Create a text form
	 * @memberof Api
	 * @param {TextFormPr} oFormPr - text form properties
	 * @returns {ApiTextForm}
	 */
	Api.prototype.CreateTextForm = function(oFormPr)
	{
		if (!oFormPr)
			oFormPr = {};

		let oCC = CreateCommonForm(oFormPr);

		let oPr = new AscCommon.CSdtTextFormPr();
		oPr.SetComb(GetBoolParameter(oFormPr["comb"], false));
		oPr.SetMaxCharacters(GetNumberParameter(oFormPr["maxCharacters"], -1));
		oPr.SetMultiLine(GetBoolParameter(oFormPr["multiLine"], false));
		oPr.SetAutoFit(GetBoolParameter(oFormPr["autoFit"], false));
		oPr.SetWidth((GetNumberParameter(oFormPr["cellWidth"], 0) * 72 * 20 / 25.4) | 0);

		oCC.ApplyTextFormPr(oPr);

		return new AscBuilder.ApiTextForm(oCC);
	};
	/**
	 * Create the checkbox/radiobutton form
	 * @memberof Api
	 * @param {CheckBoxFormPr} oFormPr - checkbox(radiobutton) form properties
	 * @returns {ApiCheckBoxForm}
	 */
	Api.prototype.CreateCheckBoxForm = function(oFormPr)
	{
		if (!oFormPr)
			oFormPr = {};

		oFormPr["placeholder"] = undefined;

		var oCC;
		var oCheckboxPr  = new AscCommon.CSdtCheckBoxPr();
		if (GetBoolParameter(oFormPr["radio"], false))
		{
			oCheckboxPr.CheckedSymbol   = 0x25C9;
			oCheckboxPr.UncheckedSymbol = 0x25CB;
			oCheckboxPr.GroupKey        = GetStringParameter(oFormPr["key"], "Group1");
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
			oCC = CreateCommonForm(oFormPr);
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
	 * Create a combobox/dropdown form
	 * @memberof Api
	 * @param {ComboBoxFormPr} oFormPr - combobox form properties
	 * @returns {ApiComboBoxForm}
	 */
	Api.prototype.CreateComboBoxForm = function(oFormPr)
	{
		if (!oFormPr)
			oFormPr = {};

		var oPr = new CSdtComboBoxPr();
		oPr.AddItem(AscCommon.translateManager.getValue("Choose an item"), "");

		var oCC = CreateCommonForm(oFormPr);

		let sPlaceholder = GetStringParameter(oFormPr["placeholder"], undefined);

		let arrList = GetArrayParameter(oFormPr["items"], []);
		for (let nIndex = 0, nCount = arrList.length; nIndex < nCount; ++nIndex)
		{
			let oItem = arrList[nIndex];

			if (GetStringParameter(oItem, null))
			{
				oPr.AddItem(oItem, oItem);
			}
			else if (GetArrayParameter(oItem, null))
			{
				let sDisplay = GetStringParameter(oItem[0], null);
				let sValue   = GetStringParameter(oItem[1], null);
				if (null !== sDisplay && null !== sValue)
					oPr.AddItem(sDisplay, sValue);
			}
		}
		oPr.SetAutoFit(GetBoolParameter(oFormPr["autoFit"], false));

		if (!GetBoolParameter(oFormPr["editable"], false))
		{
			if (sPlaceholder)
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
			if (sPlaceholder)
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
	 * Create a picture form
	 * @memberof Api
	 * @param {PictureFormPr} oFormPr - picture form properties
	 * @returns {ApiPictureForm}
	 */
	Api.prototype.CreatePictureForm = function(oFormPr)
	{
		if (!oFormPr)
			oFormPr = {};

		if (GetStringParameter("placeholder", null))
			oFormPr["placeholder"] = AscCommon.translateManager.getValue("Click to load image");

		var oCC = CreateCommonForm(oFormPr);
		oCC.ApplyPicturePr(true);
		oCC.ConvertFormToFixed();

		let oPr = new AscCommon.CSdtPictureFormPr();

		let sScale = GetStringParameter(oFormPr["scaleFlag"], undefined);
		switch (sScale)
		{
			case "always": oPr.SetScaleFlag(Asc.c_oAscPictureFormScaleFlag.Always); break;
			case "never": oPr.SetScaleFlag(Asc.c_oAscPictureFormScaleFlag.Never); break;
			case "tooBig": oPr.SetScaleFlag(Asc.c_oAscPictureFormScaleFlag.Bigger); break;
			case "tooSmall": oPr.SetScaleFlag(Asc.c_oAscPictureFormScaleFlag.Smaller); break;
		}

		oPr.SetConstantProportions(GetBoolParameter(oFormPr["lockAspectRatio"], true));
		oPr.SetRespectBorders(GetBoolParameter(oFormPr["respectBorders"], false));
		oPr.SetShiftX(Math.max(0, Math.min(100, GetNumberParameter(oFormPr["shiftX"], 50))) / 100);
		oPr.SetShiftY(Math.max(0, Math.min(100, GetNumberParameter(oFormPr["shiftY"], 50))) / 100);

		oCC.SetPictureFormPr(oPr);

		return new AscBuilder.ApiPictureForm(oCC);
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Private area
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CreateCommonForm(oFormPr)
	{
		if (!oFormPr)
			oFormPr = {};
		
		var oTempFormPr = new AscCommon.CSdtFormPr();
		oTempFormPr.SetHelpText(GetStringParameter(oFormPr["tip"], undefined));
		oTempFormPr.SetRequired(GetBoolParameter(oFormPr["required"], false));
		oTempFormPr.SetKey(GetStringParameter(oFormPr["key"], undefined));

		var oCC = new AscCommonWord.CInlineLevelSdt();

		let sPlaceHolder = GetStringParameter(oFormPr["placeholder"], undefined);
		if (sPlaceHolder)
			oCC.SetPlaceholderText(sPlaceHolder);
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
