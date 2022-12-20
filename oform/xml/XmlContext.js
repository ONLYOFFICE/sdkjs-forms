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

(function(window)
{
	/**
	 * Класс для работы с ссылками внутри xml структуры
	 * @constructor
	 */
	function XmlContext(pkg)
	{
		this.pkg = pkg;
		
		this.pathToUser        = {};
		this.pathToUserMaster  = {};
		this.pathToFieldMaster = {};
	}
	XmlContext.prototype.getUser = function(path)
	{
		let rel = reader.rels.getRelationship(context.InitOpenManager.legacyDrawingId);
		let oRelPart = reader.rels.pkg.getPartByUri(oRel.getFullPath());
		
		path = this.getFullPath(path, part);
		let user = this.pathToUser[path];
		if (!user)
		{
			this.pkg.getPartByUri(path);
		}
		
		return user;
	};
	XmlContext.prototype.getUserMaster = function(path)
	{
		let userMaster = this.pathToUserMaster[path];
		if (userMaster)
			return userMaster;
		
		let part = this.pkg.getPartByUri(path);
		let partContent = part ? part.getDocumentContent() : null;
		if (!partContent)
			return null;
		
		let reader = new AscCommon.StaxParser(partContent, part, this);
		return AscOForm.CUserMaster.fromXml(reader);
	};
	XmlContext.prototype.getFieldMaster = function(path)
	{
	
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Private area
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.XmlContext = XmlContext;
	
})(window);
