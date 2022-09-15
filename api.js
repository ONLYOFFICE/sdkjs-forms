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
			let oFormParaDrawing = null;
			if (oCC && oFormPr)
			{
				oCC.SetFormPr(oFormPr);
				oCC.UpdatePlaceHolderTextPrForForm();
				oFormParaDrawing = oCC.ConvertFormToFixed();
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
			if(oFormParaDrawing) 
			{
				let oFormShape = oFormParaDrawing.GraphicObj;
				if(oFormShape) 
				{
					oFormShape.Set_CurrentElement(true, null, true);
				}
			}
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
	window['Asc']['asc_docs_api'].prototype['asc_AddContentControlTextForm'] = window['Asc']['asc_docs_api'].prototype.asc_AddContentControlTextForm = function(contentControlPr)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		let textFormPr      = contentControlPr ? contentControlPr.TextFormPr : null;
		let formPr          = contentControlPr ? contentControlPr.FormPr : null;
		let placeholderText = contentControlPr ? contentControlPr.PlaceholderText : "";

		if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
		{
			oLogicDocument.StartAction(AscDFH.historydescription_Document_AddContentControlTextForm);

			var oCC = oLogicDocument.AddContentControlTextForm(textFormPr);
			if (oCC)
			{
				if (placeholderText)
					oCC.SetPlaceholderText(placeholderText);

				if (formPr)
				{
					oCC.SetFormPr(formPr);
					oCC.UpdatePlaceHolderTextPrForForm();
				}
			}

			oLogicDocument.UpdateInterface();
			oLogicDocument.Recalculate();
			oLogicDocument.FinalizeAction();
		}
	};
	window['Asc']['asc_docs_api'].prototype['asc_AddComplexForm'] = window['Asc']['asc_docs_api'].prototype.asc_AddComplexForm = function(json, formPr)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return;

		function AddComplexForm()
		{
			if (!logicDocument.IsSelectionLocked(AscCommon.changestype_Paragraph_Content))
			{
				logicDocument.StartAction(AscDFH.historydescription_Document_AddComplexForm);

				let complexForm = logicDocument.AddComplexForm(new AscWord.CSdtComplexFormPr(), formPr);

				if (json)
					AscWord.JsonToForm(json, complexForm);

				logicDocument.UpdateInterface();
				logicDocument.Recalculate();
				logicDocument.FinalizeAction();
			}
		}

		if (json)
		{
			AscFonts.FontPickerByCharacter.checkText(AscWord.GetUnicodesFromJsonToForm(), this, function() {
				AddComplexForm();
			}, true);
		}
		else
		{
			AddComplexForm();
		}
	};
	window['Asc']['asc_docs_api'].prototype['asc_GetCurrentComplexForm'] = window['Asc']['asc_docs_api'].prototype.asc_GetCurrentComplexForm = function()
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return null;

		let form = logicDocument.GetContentControl();
		if (!form || !form.IsForm())
			return null;

		let mainForm = form.GetMainForm();

		return (mainForm.IsComplexForm() ? mainForm : null);
	};
	window['Asc']['asc_docs_api'].prototype['asc_ConvertFormToJson'] = window['Asc']['asc_docs_api'].prototype.asc_ConvertFormToJson = function(form)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return null;

		if (typeof (form) === "string")
			form = AscCommon.g_oTableId.Get_ById(form);

		if (!form || !(form instanceof AscWord.CInlineLevelSdt) || !form.IsForm())
			return null;

		return AscWord.FormToJson(form);
	};

})(window, window.document);
