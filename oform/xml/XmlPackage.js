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
	 * Класс для работы с форматом oform в xml
	 * @constructor
	 */
	function XmlPackage(zip)
	{
		this.zip   = zip;
		this.parts = {};
		
		this.openFromZip(zip);
	}
	XmlPackage.prototype.openFromZip = function(zip)
	{
		let pkg = this;
		zip.files.forEach(function(path)
		{
			if (!path.endsWith("/"))
			{
				var f2 = "/" + path;
				var contentType = null;
				if (path !== "[Content_Types].xml")
				{
					f2 = "/" + path;
					contentType = pkg.getContentType(f2);
				}
				pkg.parts[f2] = new AscCommon.openXml.OpenXmlPart(pkg, f2, contentType);
			}
		});
	};
	XmlPackage.prototype.getContentType = function(path)
	{
		return 0;
	};
	
	
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.XmlPackage = XmlPackage;
	
	AscOForm.Test = function()
	{
		let bse64Zip = "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";
		var dstLen = bse64Zip.length;
		var pointer = g_memory.Alloc(dstLen);
		var stream = new AscCommon.FT_Stream2(pointer.data, dstLen);
		stream.obj = pointer.obj;
		
		var oBinaryFileReader = new AscCommonExcel.BinaryFileReader();
		oBinaryFileReader.getbase64DecodedData2(bse64Zip, 0, stream, 0);
		
		let jsZlib = new AscCommon.ZLib();
		if (jsZlib.open(new Uint8Array(pointer.data)))
		{
			let pkg = new XmlPackage(jsZlib);
			console.log(pkg);
		}
	}
	
})(window);
