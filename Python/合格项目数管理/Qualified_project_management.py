import requests
# data={'cclindex':'8658','p':164502}
# url='http://jxpro.app.clinet.cn/paramset/PTRecordZSSet.aspx'
# con=requests.get(url,data)
# response=con.text
# print(response)


url='http://jxpro.app.clinet.cn/paramset/ItemPassPage.aspx?cclindex=8658'
header='Cookie: JxPro=ADB2EE70A41C9BBCD16AA5445EBCF68E94E227B239CEFB917607578C656A06F920E06A4E16EAD82D81FA35B57DC1787E9A822AC99340914F32E3C48C70D7D0FA7E2B5430F2FA228B8FC8A04DD81334A8B246F042FDD53F70D031A042D38D06B75D1F8988C4DC0487E0C15F7E349D5B866A830B20D851B89324EE0F741CFB3346'
body={
'ScriptManager1':'ScriptManager1|Button1',
'__EVENTTARGET':'',
'__EVENTARGUMENT':'',
'YearSpecialityUc$YearDrop':2019,
'YearSpecialityUc$SpecialityDrop':12,
'LabindexTbx':2017004,
'__VIEWSTATE':'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',
'__VIEWSTATEGENERATOR':'104AF141',
'__EVENTVALIDATION':'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',
'__ASYNCPOST':'true',
'Button1':'检索'}
con=requests.post(url,data=body)
respnose=con.text
print(respnose)