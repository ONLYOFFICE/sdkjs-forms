/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

"use strict";

(function(window)
{
	/**
	 * Base change for working with a container where values are added/removed by string key
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBase}
	 */
	function CChangesDictionaryBase(Class, key, isAdd)
	{
		AscDFH.CChangesBase.call(this, Class);
		this.Key = key;
		this.Add = isAdd;
	}
	CChangesDictionaryBase.prototype = Object.create(AscDFH.CChangesBase.prototype);
	CChangesDictionaryBase.prototype.constructor = CChangesDictionaryBase;
	CChangesDictionaryBase.prototype.Redo = function()
	{
		if (this.Add)
			this.private_AddToDictionary();
		else
			this.private_RemoveFromDictionary();
	};
	CChangesDictionaryBase.prototype.Undo = function()
	{
		if (this.Add)
			this.private_RemoveFromDictionary();
		else
			this.private_AddToDictionary();
	};
	CChangesDictionaryBase.prototype.WriteToBinary = function(writer)
	{
		writer.WriteString2(this.Key);
		writer.WriteBool(this.Add);
	};
	CChangesDictionaryBase.prototype.ReadFromBinary = function(reader)
	{
		this.Key = reader.GetString2();
		this.Add = reader.GetBool();
	};
	CChangesDictionaryBase.prototype.IsNeedRecalculate = function()
	{
		return false;
	};
	CChangesDictionaryBase.prototype.CreateReverseChange = function()
	{
		return new this.constructor(this.Class, this.Key, !this.Add);
	};
	CChangesDictionaryBase.prototype.private_AddToDictionary = function()
	{
	};
	CChangesDictionaryBase.prototype.private_RemoveFromDictionary = function()
	{
	};
	window['AscDFH'].CChangesDictionaryBase = CChangesDictionaryBase;

	function InheritDictionaryChange(changeClass, type, addFunction, removeFunction)
	{
		window['AscDFH'].changesFactory[type] = changeClass;

		changeClass.prototype                              = Object.create(CChangesDictionaryBase.prototype);
		changeClass.prototype.constructor                  = changeClass;
		changeClass.prototype.Type                         = type;
		changeClass.prototype.private_AddToDictionary      = addFunction;
		changeClass.prototype.private_RemoveFromDictionary = removeFunction;
	}
	window['AscDFH'].InheritDictionaryChange = InheritDictionaryChange;

})(window);
