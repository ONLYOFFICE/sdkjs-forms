/*
 * (c) Copyright Ascensio System SIA 2010-2023
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
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
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

	const ApiDocument            = AscBuilder.ApiDocument;
	const GetStringParameter     = AscBuilder.GetStringParameter;
	const GetBoolParameter       = AscBuilder.GetBoolParameter;
	const GetNumberParameter     = AscBuilder.GetNumberParameter;
	const GetArrayParameter      = AscBuilder.GetArrayParameter;
	const executeNoFormLockCheck = AscBuilder.executeNoFormLockCheck;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Base class
	 * @global
	 * @class
	 * @name Api
	 */
	var Api = window["Asc"]["asc_docs_api"] || window["Asc"]["spreadsheet_api"];
 
	/**
	 * Common form properties.
	 * @typedef {Object} FormPrBase
	 * @property {string} key - Form key.
	 * @property {string} tip - Form tip text.
	 * @property {boolean} required - Specifies if the form is required or not.
	 * @property {string} placeholder - Form placeholder text.
	 */

	/**
	 * Specific text field properties.
	 * @typedef {Object} TextFormPrBase
	 * @property {boolean} comb - Specifies if the text field should be a comb of characters with the same cell width. The maximum number of characters must be set to a positive value.
	 * @property {number} maxCharacters - The maximum number of characters in the text field.
	 * @property {number} cellWidth - The cell width for each character measured in millimeters. If this parameter is not specified or equal to 0 or less, then the width will be set automatically.
	 * @property {boolean} multiLine - Specifies if the current fixed size text field is multiline or not.
	 * @property {boolean} autoFit - Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the size of the fixed size form.
	 */

	/**
	 * Text field properties.
	 * @typedef {FormPrBase | TextFormPrBase} TextFormPr
	 */
	
	/**
	 * Form insertion specific properties.
	 * @typedef {Object} FormInsertPr
	 * @property {boolean} [placeholderFromSelection=false] - Specifies if the currently selected text should be saved as a placeholder of the inserted form.
	 * @property {boolean} [keepSelectedTextInForm=true] - Specifies if the currently selected text should be saved as the content of the inserted form.
	 */
	
	/**
	 * Properties for inserting a text field.
	 * @typedef {FormPrBase | TextFormPrBase | FormInsertPr} TextFormInsertPr
	 */
	
	 
	/**
	 * Specific checkbox / radio button properties.
	 * @typedef {Object} CheckBoxFormPrBase
	 * @property {boolean} radio - Specifies if the current checkbox is a radio button. In this case, the key parameter is considered as an identifier for the group of radio buttons.
	 */

	/**
	 * Checkbox / radio button properties.
	 * @typedef {FormPrBase | CheckBoxFormPrBase} CheckBoxFormPr
	 */

	/**
	 * Specific combo box / dropdown list properties.
	 * @typedef {Object} ComboBoxFormPrBase
	 * @property {boolean} editable - Specifies if the combo box text can be edited.
	 * @property {boolean} autoFit - Specifies if the combo box form content should be autofit, i.e. whether the font size adjusts to the size of the fixed size form.
	 * @property {Array.<string | Array.<string>>} items - The combo box items.
     * This array consists of strings or arrays of two strings where the first string is the displayed value and the second one is its meaning.
     * If the array consists of single strings, then the displayed value and its meaning are the same.
     * Example: ["First", ["Second", "2"], ["Third", "3"], "Fourth"].

	 */

	/**
	 * Combo box / dropdown list properties.
	 * @typedef {FormPrBase | ComboBoxFormPrBase} ComboBoxFormPr
	 */

	/**
	 * The condition to scale an image in the picture form.
	 * @typedef {"always" | "never" | "tooBig" | "tooSmall"} ScaleFlag
	 */

	/**
	 * Value from 0 to 100.
	 * @typedef {number} percentage
	 */

	/**
	 * Specific picture form properties.
	 * @typedef {Object} PictureFormPrBase
	 * @property {ScaleFlag} scaleFlag - The condition to scale an image in the picture form: "always", "never", "tooBig" or "tooSmall".
	 * @property {boolean} lockAspectRatio - Specifies if the aspect ratio of the picture form is locked or not.
	 * @property {boolean} respectBorders - Specifies if the form border width is respected or not when scaling the image.
	 * @property {percentage} shiftX - Horizontal picture position inside the picture form measured in percent:
	 * * <b>0</b> - the picture is placed on the left;
	 * * <b>50</b> - the picture is placed in the center;
	 * * <b>100</b> - the picture is placed on the right.
	 * @property {percentage} shiftY - Vertical picture position inside the picture form measured in percent:
	 * * <b>0</b> - the picture is placed on top;
	 * * <b>50</b> - the picture is placed in the center;
	 * * <b>100</b> - the picture is placed on the bottom.
	 */

	/**
	 * Picture form properties.
	 * @typedef {FormPrBase | PictureFormPrBase} PictureFormPr
	 */

	/**
	 * Specific date form properties.
	 * @typedef {Object} DateFormPrBase
	 * @property {string} format	- The date format, ex: mm.dd.yyyy
	 * @property {string} lang		- The date language. Possible value for this parameter is a language identifier as defined by
	 * RFC 4646/BCP 47. Example: "en-CA".
	 */

	/**
	 * Date form properties.
	 * @typedef {FormPrBase | DateFormPrBase} DateFormPr
	 */

	/**
	 * Creates a text field with the specified text field properties.
	 * @memberof Api
	 * @param {TextFormPr} oFormPr - Text field properties.
	 * @returns {ApiTextForm}
	 */
	Api.prototype.CreateTextForm = function(oFormPr)
	{
		return executeNoFormLockCheck(function()
		{
			if (!oFormPr)
				oFormPr = {};
			
			let form = CreateCommonForm(oFormPr);
			ApplyTextFormPr(form, oFormPr);
			CheckFormKey(form);
			return new AscBuilder.ApiTextForm(form);
		}, this);
	};
	/**
	 * Creates a checkbox / radio button with the specified checkbox / radio button properties.
	 * @memberof Api
	 * @param {CheckBoxFormPr} oFormPr - Checkbox / radio button properties.
	 * @returns {ApiCheckBoxForm}
	 */
	Api.prototype.CreateCheckBoxForm = function(oFormPr)
	{
		return executeNoFormLockCheck(function()
		{
			if (!oFormPr)
				oFormPr = {};
			
			oFormPr["placeholder"] = undefined;
			
			var oCC;
			var oCheckboxPr = new AscCommon.CSdtCheckBoxPr();
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
			
			oCheckboxPr.CheckedFont   = "Segoe UI Symbol";
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
				var oFonts             = {};
				oFonts[sCheckedFont]   = true;
				oFonts[sUncheckedFont] = true;
				
				AscCommon.Check_LoadingDataBeforePrepaste(this, oFonts, {}, private_PerformAddCheckBox);
			}
			else
			{
				private_PerformAddCheckBox();
			}
			
			CheckFormKey(oCC);
			return new AscBuilder.ApiCheckBoxForm(oCC);
		}, this);
	};
	/**
	 * Creates a combo box / dropdown list with the specified combo box / dropdown list properties.
	 * @memberof Api
	 * @param {ComboBoxFormPr} oFormPr - Combo box / dropdown list properties.
	 * @returns {ApiComboBoxForm}
	 */
	Api.prototype.CreateComboBoxForm = function(oFormPr)
	{
		return executeNoFormLockCheck(function()
		{
			if (!oFormPr)
				oFormPr = {};
			
			var oPr = new AscCommon.CSdtComboBoxPr();
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
			
			CheckFormKey(oCC);
			return new AscBuilder.ApiComboBoxForm(oCC);
		}, this);
	};
	/**
	 * Creates a picture form with the specified picture form properties.
	 * @memberof Api
	 * @param {PictureFormPr} oFormPr - Picture form properties.
	 * @returns {ApiPictureForm}
	 */
	Api.prototype.CreatePictureForm = function(oFormPr)
	{
		return executeNoFormLockCheck(function()
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
				case "always":
					oPr.SetScaleFlag(Asc.c_oAscPictureFormScaleFlag.Always);
					break;
				case "never":
					oPr.SetScaleFlag(Asc.c_oAscPictureFormScaleFlag.Never);
					break;
				case "tooBig":
					oPr.SetScaleFlag(Asc.c_oAscPictureFormScaleFlag.Bigger);
					break;
				case "tooSmall":
					oPr.SetScaleFlag(Asc.c_oAscPictureFormScaleFlag.Smaller);
					break;
			}
			
			oPr.SetConstantProportions(GetBoolParameter(oFormPr["lockAspectRatio"], true));
			oPr.SetRespectBorders(GetBoolParameter(oFormPr["respectBorders"], false));
			oPr.SetShiftX(Math.max(0, Math.min(100, GetNumberParameter(oFormPr["shiftX"], 50))) / 100);
			oPr.SetShiftY(Math.max(0, Math.min(100, GetNumberParameter(oFormPr["shiftY"], 50))) / 100);
			
			oCC.SetPictureFormPr(oPr);
			
			CheckFormKey(oCC);
			return new AscBuilder.ApiPictureForm(oCC);
		}, this);
	};
	/**
	 * Creates a date form with the specified date form properties.
	 * @memberof Api
	 * @param {DateFormPr} oFormPr - Date form properties.
	 * @returns {ApiDateForm}
	 */
	Api.prototype.CreateDateForm = function(oFormPr)
	{
		return executeNoFormLockCheck(function()
		{
			if (!oFormPr)
				oFormPr = {};
			
			let form = CreateCommonForm(oFormPr);
			ApplyDateFormPr(form, oFormPr);
			CheckFormKey(form);
			return new AscBuilder.ApiDateForm(form);
		}, this);
	};
	/**
	 * Inserts a text box with the specified text box properties over the selected text.
	 * @memberof ApiDocument
	 * @param {TextFormInsertPr} oFormPr - Properties for inserting a text field.
	 * @returns {ApiTextForm}
	 */
	ApiDocument.prototype.InsertTextForm = function(oFormPr)
	{
		return executeNoFormLockCheck(function()
		{
			if (!oFormPr)
				oFormPr = {};
			
			let logicDocument = this.Document;
			let placeholder   = GetStringParameter(oFormPr["placeholder"], undefined);
			if (GetBoolParameter(oFormPr["placeholderFromSelection"], false))
				placeholder = logicDocument.GetSelectedText();
			
			if (!GetBoolParameter(oFormPr["keepSelectedTextInForm"], true))
				logicDocument.RemoveBeforePaste();
			
			let contentControl = logicDocument.AddContentControl(c_oAscSdtLevelType.Inline);
			if (!contentControl)
				return null;
			
			ApplyCommonFormPr(contentControl, oFormPr);
			SetFormPlaceholder(contentControl, placeholder);
			ApplyTextFormPr(contentControl, oFormPr, true);
			CheckFormKey(contentControl);
			return new AscBuilder.ApiTextForm(contentControl);
		}, this);
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Private area
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CreateCommonForm(oFormPr)
	{
		let contentControl = new AscCommonWord.CInlineLevelSdt();
		
		ApplyCommonFormPr(contentControl, oFormPr);
		
		let placeholder = oFormPr ? GetStringParameter(oFormPr["placeholder"], undefined) : undefined;
		SetFormPlaceholder(contentControl, placeholder);
		
		contentControl.ReplaceContentWithPlaceHolder(false);
		contentControl.UpdatePlaceHolderTextPrForForm();
		return contentControl;
	}
	function SetFormPlaceholder(form, text)
	{
		if (text)
			form.SetPlaceholderText(text);
		else
			form.SetPlaceholder(c_oAscDefaultPlaceholderName.Text);
	}
	function ApplyCommonFormPr(form, formPr)
	{
		if (!formPr)
			formPr = {};
		
		let sdtFormPr = new AscCommon.CSdtFormPr();
		sdtFormPr.SetHelpText(GetStringParameter(formPr["tip"], undefined));
		sdtFormPr.SetRequired(GetBoolParameter(formPr["required"], false));
		sdtFormPr.SetKey(GetStringParameter(formPr["key"], undefined));
		form.SetFormPr(sdtFormPr);
	}
	function ApplyTextFormPr(form, formPr, keepContent)
	{
		let textFormPr = new AscCommon.CSdtTextFormPr();
		textFormPr.SetComb(GetBoolParameter(formPr["comb"], false));
		textFormPr.SetMaxCharacters(GetNumberParameter(formPr["maxCharacters"], -1));
		textFormPr.SetMultiLine(GetBoolParameter(formPr["multiLine"], false));
		textFormPr.SetAutoFit(GetBoolParameter(formPr["autoFit"], false));
		textFormPr.SetWidth((GetNumberParameter(formPr["cellWidth"], 0) * 72 * 20 / 25.4) | 0);
		form.ApplyTextFormPr(textFormPr, keepContent);
	}
	function ApplyDateFormPr(form, formPr)
	{
		let datePickerPr = new AscCommon.CSdtDatePickerPr();

		var nLcid = Asc.g_oLcidNameToIdMap[formPr["lang"]];
		if (undefined == nLcid)
			nLcid = 1033;

		datePickerPr.SetDateFormat(GetStringParameter(formPr["format"], "mm/dd/yyyy"));
		datePickerPr.SetLangId(nLcid);

		form.ApplyDatePickerPr(datePickerPr);
	}
	function CheckFormKey(form)
	{
		let logicDocument = editor && editor.WordControl && editor.WordControl.m_oLogicDocument;
		if (!form || !form.IsForm() || !logicDocument)
			return;

		let key = form.GetFormKey();
		if (key && "" !== key.trim())
			return;

		let formManager  = logicDocument.GetFormsManager();
		let keyGenerator = formManager.GetKeyGenerator();

		let formPr = form.GetFormPr().Copy();
		if (!formPr)
			return;

		key = keyGenerator.GetNewKey(form);
		formPr.SetKey(key);
		form.SetFormPr(formPr);
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Export
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	Api.prototype["CreateTextForm"]     = Api.prototype.CreateTextForm;
	Api.prototype["CreatePictureForm"]  = Api.prototype.CreatePictureForm;
	Api.prototype["CreateDateForm"]		= Api.prototype.CreateDateForm;
	Api.prototype["CreateCheckBoxForm"] = Api.prototype.CreateCheckBoxForm;	
	Api.prototype["CreateComboBoxForm"] = Api.prototype.CreateComboBoxForm;
	
	ApiDocument.prototype["InsertTextForm"] = ApiDocument.prototype.InsertTextForm;

}(window, null));
