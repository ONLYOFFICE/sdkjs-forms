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
	var Api = window["Asc"]["asc_docs_api"];

	/**
	 * Checkbox form properties.
	 * @typedef {Object} CheckBoxFormPr
	 * @property {string} Key
	 * @property {boolean} Fixed
	 * @property {string} Tip
	 * @property {boolean} Required
	 */

	/**
	 * Checkbox form properties.
	 * @typedef {Object} FormPr
	 * @property {string} Key
	 * @property {boolean} Fixed
	 * @property {string} Tip
	 * @property {boolean} Required
	 * @property {string} Placeholder
	 */

	/**
	 * Checkbox form properties.
	 * @typedef {Object} PicFormPr
	 * @property {string} Key
	 * @property {boolean} Fixed
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
	 * Adds the checkbox (or radiobutton) form to specified paragraph.
	 * @memberof Api
	 * @param {ApiParagraph} oParagraph - the paragraph to which the form will be added.
	 * @param {Number} [nPos=oParagraph.GetElementsCount()] - position to add form in the paragraph.
	 * @param {CheckBoxFormPr} [oFormPr={Key: "", Fixed: false, Tip: "", Required: false}] - checkbox(radiobutton) form properties.
	 * @param {boolean} [isRadioButton=false] - Indicates whether radiobutton form will be added.
	 * @returns {ApiCheckBoxForm}
	 */
	Api.prototype.AddCheckBoxForm = function(oParagraph, nPos, oFormPr, isRadioButton)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (typeof(nPos) !== "number")
			nPos = oParagraph.GetElementsCount();

		if (!oLogicDocument || !oParagraph.GetClassType || oParagraph.GetClassType() !== "paragraph" || nPos < 0 || nPos > oParagraph.Paragraph.Content.length - 1)
			return false;

		oFormPr.Fixed = oFormPr && oFormPr.Fixed && typeof(oFormPr.Fixed) === "boolean" ? oFormPr.Fixed : false;
		oFormPr.HelpText = oFormPr && oFormPr.Tip && typeof(oFormPr.Tip) === "string" && oFormPr.Tip !== "" ? oFormPr.Tip : undefined;
		oFormPr.Required = oFormPr && oFormPr.Required && typeof(oFormPr.Required) === "boolean" ? oFormPr.Required : false;
		oFormPr.Placeholder = undefined;

		if (isRadioButton === true)
		{
			oFormPr.GroupKey = oFormPr && oFormPr.Key && typeof(oFormPr.Key) === "string" && oFormPr.Key !== "" ? oFormPr.Key : "Group 1";
			oFormPr.Key = undefined;
		}
		else
		{
			oFormPr.Key = oFormPr && oFormPr.Key && typeof(oFormPr.Key) === "string" && oFormPr.Key !== "" ? oFormPr.Key : undefined;
			oFormPr.GroupKey = undefined;
		}

		var oCC;
		var oCheckboxPr  = new AscCommon.CSdtCheckBoxPr();
		if (oFormPr.GroupKey)
		{
			oCheckboxPr.CheckedSymbol   = 0x25C9;
			oCheckboxPr.UncheckedSymbol = 0x25CB;
			oCheckboxPr.GroupKey        = oFormPr.GroupKey;
		}
		else
		{
			oCheckboxPr.CheckedSymbol   = 0x2611;
			oCheckboxPr.UncheckedSymbol = 0x2610;
		}

		oCheckboxPr.CheckedFont = "Segoe UI Symbol";
		oCheckboxPr.UncheckedFont = "Segoe UI Symbol";
		oCheckboxPr.Checked = oFormPr.Checked;

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
			oCC = private_AddCommonFormToPara(oParagraph.private_GetImpl(), nPos, oFormPr);

			var oTextPr = oLogicDocument.GetDirectTextPr();
			oCC.ApplyCheckBoxPr(oCheckboxPr, oTextPr);
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

		var oApiForm = this.private_CreateCheckBoxForm(oCC);
		if (oFormPr.Fixed)
			oApiForm.SetFixedForm(true);

		return oApiForm;
	};

	/**
	 * Add the text form
	 * @memberof AscBuilder.ApiParagraph
	 * @param {Number} position to add form in the paragraph (add to the end if this parameter is not specified)
	 * @param {FormPr} [oFormPr={Key: "", Fixed: false, Tip: "", Required: false}] - form properties
	 * @returns {ApiTextForm}
	 */
	AscBuilder.ApiParagraph.prototype.AddTextForm = function(nPos, oFormPr)
	{
		let nParaLen = this.GetElementsCount();
		nPos = undefined === nPos ? nParaLen : Math.max(0, Math.min(nParaLen, nPos));		

		var oCC = private_AddCommonFormToPara(this.private_GetImpl(), nPos, oFormPr);
		var oPr = new AscCommon.CSdtTextFormPr();
		oCC.ApplyTextFormPr(oPr);

		var oApiForm = new AscBuilder.ApiTextForm(oCC);
		if (oFormPr.Fixed)
			oApiForm.SetFixedForm(true);

		return oApiForm;
	};

	/**
	 * Adds the combobox (or dropdown) form to specified paragraph.
	 * @memberof Api
	 * @param {ApiParagraph} oParagraph - the paragraph to which the form will be added.
	 * @param {Number} [nPos=oParagraph.GetElementsCount()] - position to add form in the paragraph.
	 * @param {FormPr} [oFormPr={Key: "", Fixed: false, Tip: "", Required: false}] - form properties.
	 * @param {boolean} [isDropDown=false] - Indicates whether dropdown form will be added.
	 * @returns {ApiComboBoxForm}
	 */
	Api.prototype.AddDropDownForm = function(oParagraph, nPos, oFormPr, isDropDown)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (nPos === undefined)
			nPos = oParagraph.GetElementsCount();

		if (!oLogicDocument || !oParagraph.GetClassType || oParagraph.GetClassType() !== "paragraph" || nPos < 0 || nPos > oParagraph.Paragraph.Content.length - 1)
			return false;

		var oPr = new CSdtComboBoxPr();
		oPr.AddItem(AscCommon.translateManager.getValue("Choose an item"), "");

		var oCC = private_AddCommonFormToPara(oParagraph.private_GetImpl(), nPos, oFormPr);

		if (isDropDown === true)
		{
			if (typeof(oFormPr.Placeholder) !== "string" || oFormPr.Placeholder === "")
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
			if (typeof(oFormPr.Placeholder) !== "string" || oFormPr.Placeholder === "")
			{
				oCC.ApplyComboBoxPr(oPr);
			}
			else
			{
				oCC.SetComboBoxPr(oPr);
				oCC.SelectListItem();
			}
		}

		var oApiForm = this.private_CreateComboBoxForm(oCC);
		if (oFormPr.Fixed)
			oApiForm.SetFixedForm(true);

		return oApiForm;
	};

	/**
	 * Add the picture form to specified paragraph
	 * @memberof AscBuilder.ApiParagraph
	 * @param {Number} position to add form in the paragraph (add to the end if this parameter is not specified)
	 * @param {PicFormPr} [oFormPr={Key: "", Tip: "", Required: false, Scale: "always"}] - picture form properties
	 * @returns {ApiPictureForm}
	 */
	AscBuilder.ApiParagraph.prototype.AddPictureForm = function(nPos, oFormPr)
	{
		let nParaLen = this.GetElementsCount();
		nPos = undefined === nPos ? nParaLen : Math.max(0, Math.min(nParaLen, nPos));		
		
		let oParagraph = this.private_GetImpl();
		
		if (!oFormPr)
			oFormPr = {};
		
		if (typeof(oFormPr.Placeholder) !== "string" || oFormPr.Placeholder === "")
			oFormPr.Placeholder = AscCommon.translateManager.getValue("Click to load image");

		var oCC = private_AddCommonFormToPara(oParagraph, nPos, oFormPr);
		oCC.ApplyPicturePr(true);
		oCC.ConvertFormToFixed();
		oCC.SetPictureFormPr(new AscCommon.CSdtPictureFormPr());

		var oApiForm = new AscBuilder.ApiPictureForm(oCC);

		if (typeof(oFormPr.Scale) === "string" || oFormPr.Scale !== "")
			oApiForm.SetPictureScaleCase(oFormPr.Scale);

		return oApiForm;
	};

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Private area
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function private_AddCommonFormToPara(oParagraph, nPos, oFormPr)
	{
		if (!oFormPr)
			oFormPr = {};
		
		var oTempFormPr = new AscCommon.CSdtFormPr();
		oTempFormPr.HelpText = oFormPr && oFormPr.Tip && typeof(oFormPr.Tip) === "string" && oFormPr.Tip !== "" ? oFormPr.Tip : undefined;
		oTempFormPr.Required = oFormPr && oFormPr.Required && typeof(oFormPr.Required) === "boolean" ? oFormPr.Required : false;

		if (typeof(oFormPr.GroupKey) === "string")
			oTempFormPr.GroupKey = oFormPr && oFormPr.GroupKey && typeof(oFormPr.GroupKey) === "string" && oFormPr.GroupKey !== "" ? oFormPr.GroupKey : "Group 1";
		else
			oTempFormPr.Key = oFormPr && oFormPr.Key && typeof(oFormPr.Key) === "string" && oFormPr.Key !== "" ? oFormPr.Key : undefined;

		var oCC = new AscCommonWord.CInlineLevelSdt();
		
		let oParaElement = oParagraph.GetElement(nPos);
		if (oParaElement)
		{
			oParaElement.MoveCursorToStartPos();
			let oTextPr = oParaElement.GetDirectTextPr();
			if (oTextPr)			
				oCC.SetDefaultTextPr(oTextPr);	
		}				

		if (typeof(oFormPr.Placeholder) === "string" && oFormPr.Placeholder !== "")
			oCC.SetPlaceholderText(oFormPr.Placeholder);
		else
			oCC.SetPlaceholder(c_oAscDefaultPlaceholderName.Text);

		oCC.ReplaceContentWithPlaceHolder(false);
		oParagraph.AddToContent(nPos, oCC);
		oCC.SetFormPr(oTempFormPr);
		oCC.UpdatePlaceHolderTextPrForForm();

		return oCC;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Export
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	Api.prototype["AddCheckBoxForm"]      = Api.prototype.AddCheckBoxForm;	
	Api.prototype["AddDropDownForm"]      = Api.prototype.AddDropDownForm;	
	
	AscBuilder.ApiParagraph.prototype["AddTextForm"]    = AscBuilder.ApiParagraph.prototype.AddTextForm;
	AscBuilder.ApiParagraph.prototype["AddPictureForm"] = AscBuilder.ApiParagraph.prototype.AddPictureForm;

}(window, null));



