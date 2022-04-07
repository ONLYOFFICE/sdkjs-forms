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


(function(window, document) {
    window['Asc']['Addons'] = window['Asc']['Addons'] || {};
	window['Asc']['Addons']['forms'] = true; // register addon
	
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlCheckBox'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlCheckBox = function(oPr, oFormPr, oCommonPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;
		
		if (oPr && oFormPr)
		{
			if (oPr.GroupKey)
			{
				oPr.CheckedSymbol   = 0x25C9;
				oPr.UncheckedSymbol = 0x25CB;
			}
			else
			{
				oPr.CheckedSymbol   = 0x2611;
				oPr.UncheckedSymbol = 0x2610;
			}
			
			oPr.CheckedFont   = "Segoe UI Symbol";
			oPr.UncheckedFont = "Segoe UI Symbol";
		}
		
		var nCheckedSymbol   = oPr && oPr.CheckedSymbol ? oPr.CheckedSymbol : Asc.c_oAscSdtCheckBoxDefaults.CheckedSymbol;
		var nUncheckedSymbol = oPr && oPr.UncheckedSymbol ? oPr.UncheckedSymbol : Asc.c_oAscSdtCheckBoxDefaults.UncheckedSymbol;
		var sCheckedFont     = oPr && oPr.CheckedFont ? oPr.CheckedFont : Asc.c_oAscSdtCheckBoxDefaults.CheckedFont;
		var sUncheckedFont   = oPr && oPr.UncheckedFont ? oPr && oPr.UncheckedFont : Asc.c_oAscSdtCheckBoxDefaults.UncheckedFont;

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

		function private_ApplyPrToCheckBox(oCC)
		{
			if (!oCC)
				return;

			if (oFormPr)
			{
				oCC.SetFormPr(oFormPr);
				oCC.UpdatePlaceHolderTextPrForForm();
			}

			if (oCommonPr)
				oCC.SetContentControlPr(oCommonPr);
		}
		
		function private_PerformAddCheckBox()
		{

			if (oLogicDocument.IsTextSelectionUse())
			{
				let arrSelectedParagraphs = oLogicDocument.GetSelectedParagraphs();

				// Select entire paragraphs so that after the action all added checkboxes are included in the selection
				let nSelectDirection = oLogicDocument.GetSelectDirection();
				for (let nIndex = 0, nCount = arrSelectedParagraphs.length; nIndex < nCount; ++nIndex)
				{
					arrSelectedParagraphs[nIndex].SelectAll(nSelectDirection);
				}

				let oState = oLogicDocument.SaveDocumentState(false);

				if (arrSelectedParagraphs.length > 0
					&& !oLogicDocument.IsSelectionLocked(AscCommon.changestype_None, {
					Type      : AscCommon.changestype_2_ElementsArray_and_Type,
					Elements  : arrSelectedParagraphs,
					CheckType : AscCommon.changestype_Paragraph_Content
				}))
				{
					oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlCheckBox);
					oLogicDocument.RemoveSelection();

					for (let nIndex = 0, nCount = arrSelectedParagraphs.length; nIndex < nCount; ++nIndex)
					{
						let oCC = arrSelectedParagraphs[nIndex].AddCheckBoxToStartPos(oPr);
						private_ApplyPrToCheckBox(oCC);
					}

					oLogicDocument.LoadDocumentState(oState);
					oLogicDocument.UpdateInterface();
					oLogicDocument.Recalculate();
					oLogicDocument.FinalizeAction();
				}
				else
				{
					oLogicDocument.LoadDocumentState(oState);
				}
			}
			else
			{
				oLogicDocument.RemoveTextSelection();
				if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
				{
					oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlCheckBox);

					var oCC = oLogicDocument.AddContentControlCheckBox(oPr);
					private_ApplyPrToCheckBox(oCC);

					oLogicDocument.UpdateInterface();
					oLogicDocument.Recalculate();
					oLogicDocument.FinalizeAction();
				}
			}
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
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlPicture'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlPicture = function(oFormPr, oCommonPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		oLogicDocument.RemoveTextSelection();
		if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
		{
			oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlPicture);

			var oCC = oLogicDocument.AddContentControlPicture();
			if (oCC && oFormPr)
			{
				oCC.SetFormPr(oFormPr);
				oCC.UpdatePlaceHolderTextPrForForm();
				oCC.ConvertFormToFixed();
				oCC.SetPictureFormPr(new AscCommon.CSdtPictureFormPr());
				var aDrawings = oCC.GetAllDrawingObjects();
				for(var nDrawing = 0; nDrawing < aDrawings.length; ++nDrawing) 
				{
					var oDrawing = aDrawings[nDrawing];
					var oGraphic = oDrawing.GraphicObj;
					if(oGraphic && oGraphic.getObjectType() === AscDFH.historyitem_type_ImageShape) 
					{
						var oSpPr = oGraphic.spPr;
						if(oSpPr) 
						{
							if(oSpPr.Fill) 
							{
								oSpPr.setFill(null);
							}
							if(oSpPr.ln) 
							{
								oSpPr.setLn(null);
							}
							if(oSpPr.geometry) 
							{
								oSpPr.setGeometry(null);
							}
							var oXfrm = oSpPr.xfrm;
							if(oXfrm)
							{
								if(!AscFormat.fApproxEqual(oXfrm.rot, 0.0))
								{
									oXfrm.setRot(0);
								}
								if(oXfrm.flipH)
								{
									oXfrm.setFlipH(false);
								}
								if(oXfrm.flipH)
								{
									oXfrm.setFlipH(false);
								}
								if(oXfrm.flipV)
								{
									oXfrm.setFlipV(false);
								}
							}
						}
					}
				}

				if (!oCC.IsPlaceHolder())
				{
					oLogicDocument.Recalculate(true);
					oCC.UpdatePictureFormLayout();
				}
			}

			if (oCC && oCommonPr)
				oCC.SetContentControlPr(oCommonPr);

			oLogicDocument.UpdateInterface();
			oLogicDocument.Recalculate();
			oLogicDocument.FinalizeAction();
		}
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlList'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlList = function(isComboBox, oPr, oFormPr, oCommonPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		oLogicDocument.RemoveTextSelection();
		if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
		{
			oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlList);

			var oCC;
			if (isComboBox)
				oCC = oLogicDocument.AddContentControlComboBox(oPr);
			else
				oCC = oLogicDocument.AddContentControlDropDownList(oPr);

			if (oCC && oFormPr)
			{
				oCC.SetFormPr(oFormPr);
				oCC.UpdatePlaceHolderTextPrForForm();
			}

			if (oCC && oCommonPr)
				oCC.SetContentControlPr(oCommonPr);

			oLogicDocument.Recalculate();
			oLogicDocument.UpdateInterface();
			oLogicDocument.UpdateSelection();
			oLogicDocument.FinalizeAction();
		}
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlDatePicker'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlDatePicker = function(oPr, oCommonPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		oLogicDocument.RemoveTextSelection();
		if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
		{
			oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlList);
			var oCC = oLogicDocument.AddContentControlDatePicker(oPr, oCommonPr);

			if (oCC && oCommonPr)
				oCC.SetContentControlPr(oCommonPr);

			oLogicDocument.Recalculate();
			oLogicDocument.UpdateInterface();
			oLogicDocument.UpdateSelection();
			oLogicDocument.FinalizeAction();
		}
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlTextForm'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlTextForm = function(oPr, oFormPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
		{
			oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlTextForm);

			var oCC = oLogicDocument.AddContentControlTextForm(oPr);
			if (oCC && oFormPr)
			{
				oCC.SetFormPr(oFormPr);
				oCC.UpdatePlaceHolderTextPrForForm();
			}

			oLogicDocument.UpdateInterface();
			oLogicDocument.Recalculate();
			oLogicDocument.FinalizeAction();
		}
	};

	//------------------------------------------------------------------------------------------------------------------
	//
	// Word Builder
	//
	//------------------------------------------------------------------------------------------------------------------

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
	window['Asc']['asc_docs_api'].prototype['AddCheckBoxForm'] = window['Asc']['asc_docs_api'].prototype.AddCheckBoxForm = function(oParagraph, nPos, oFormPr, isRadioButton)
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
			oCC = private_AddCommonFormToPara(oLogicDocument, oParagraph.private_GetImpl(), nPos, oFormPr);

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
	 * Adds the text form to specified paragraph.
	 * @memberof Api
	 * @param {ApiParagraph} oParagraph - the paragraph to which the form will be added.
	 * @param {Number} [nPos=oParagraph.GetElementsCount()] - position to add form in the paragraph.
	 * @param {FormPr} [oFormPr={Key: "", Fixed: false, Tip: "", Required: false}] - form properties.
	 * @returns {ApiTextForm}
	 */
	window['Asc']['asc_docs_api'].prototype['AddTextForm'] = window['Asc']['asc_docs_api'].prototype.AddTextForm = function(oParagraph, nPos, oFormPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument || !oParagraph.GetClassType || oParagraph.GetClassType() !== "paragraph" || nPos < 0 || nPos > oParagraph.Paragraph.Content.length - 1)
			return false;

		var oCC = private_AddCommonFormToPara(oLogicDocument, oParagraph.private_GetImpl(), nPos, oFormPr);
		var oPr = new AscCommon.CSdtTextFormPr();
		oCC.ApplyTextFormPr(oPr);

		var oApiForm = this.private_CreateTextForm(oCC);
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
	window['Asc']['asc_docs_api'].prototype['AddDropDownForm'] = window['Asc']['asc_docs_api'].prototype.AddDropDownForm = function(oParagraph, nPos, oFormPr, isDropDown)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (nPos === undefined)
			nPos = oParagraph.GetElementsCount();

		if (!oLogicDocument || !oParagraph.GetClassType || oParagraph.GetClassType() !== "paragraph" || nPos < 0 || nPos > oParagraph.Paragraph.Content.length - 1)
			return false;

		var oPr = new CSdtComboBoxPr();
		oPr.AddItem(AscCommon.translateManager.getValue("Choose an item"), "");

		var oCC = private_AddCommonFormToPara(oLogicDocument, oParagraph.private_GetImpl(), nPos, oFormPr);

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
	 * Adds the picture form to specified paragraph.
	 * @memberof Api
	 * @param {ApiParagraph} oParagraph - the paragraph to which the form will be added.
	 * @param {Number} [nPos=oParagraph.GetElementsCount()] - position to add form in the paragraph.
	 * @param {PicFormPr} [oFormPr={Key: "", Tip: "", Required: false, Scale: "always"}] - picture form properties.
	 * @returns {ApiComboBoxForm}
	 */
	window['Asc']['asc_docs_api'].prototype['AddPictureForm'] = window['Asc']['asc_docs_api'].prototype.AddPictureForm = function(oParagraph, nPos, oFormPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (nPos === undefined)
			nPos = oParagraph.GetElementsCount();

		if (!oLogicDocument || !oParagraph.GetClassType || oParagraph.GetClassType() !== "paragraph" || nPos < 0 || nPos > oParagraph.Paragraph.Content.length - 1)
			return false;

		if (typeof(oFormPr.Placeholder) !== "string" || oFormPr.Placeholder === "")
			oFormPr.Placeholder = AscCommon.translateManager.getValue("Click to load image");

		var oCC = private_AddCommonFormToPara(oLogicDocument, oParagraph.private_GetImpl(), nPos, oFormPr);
		oCC.ApplyPicturePr(true);
		oCC.ConvertFormToFixed();
		oCC.SetPictureFormPr(new AscCommon.CSdtPictureFormPr());

		var oApiForm = this.private_CreatePictureForm(oCC);

		if (typeof(oFormPr.Scale) === "string" || oFormPr.Scale !== "")
			oApiForm.SetPictureScaleCase(oFormPr.Scale);

		return oApiForm;
	};

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Private area
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function private_AddCommonFormToPara(oDocument, oParagraph, nPos, oFormPr)
	{
		var oTempFormPr = new AscCommon.CSdtFormPr();
		oTempFormPr.HelpText = oFormPr && oFormPr.Tip && typeof(oFormPr.Tip) === "string" && oFormPr.Tip !== "" ? oFormPr.Tip : undefined;
		oTempFormPr.Required = oFormPr && oFormPr.Required && typeof(oFormPr.Required) === "boolean" ? oFormPr.Required : false;

		if (typeof(oFormPr.GroupKey) === "string")
			oTempFormPr.GroupKey = oFormPr && oFormPr.GroupKey && typeof(oFormPr.GroupKey) === "string" && oFormPr.GroupKey !== "" ? oFormPr.GroupKey : "Group 1";
		else
			oTempFormPr.Key = oFormPr && oFormPr.Key && typeof(oFormPr.Key) === "string" && oFormPr.Key !== "" ? oFormPr.Key : undefined;

		var oCC = new AscCommonWord.CInlineLevelSdt();
		oCC.SetDefaultTextPr(oDocument.GetDirectTextPr());

		if (typeof(oFormPr.Placeholder) === "string" && oFormPr.Placeholder !== "")
			oCC.SetPlaceholderText(oFormPr.Placeholder);
		else
			oCC.SetPlaceholder(c_oAscDefaultPlaceholderName.Text);

		oCC.ReplaceContentWithPlaceHolder(false);

		oParagraph.Internal_Content_Add(nPos, oCC);
		oCC.SetFormPr(oTempFormPr);
		oCC.UpdatePlaceHolderTextPrForForm();

		return oCC;
	}

})(window, window.document);
