package StringHomework;

public class Homework4 {
    public static void main(String[] args) {
        String lyric ="这些年一个人,风也过,雨也走,有过泪,有过错,还记得坚持什么,真爱过才会懂,会寂寞会回首,终有梦终有你在心中。" +
                "朋友一生一起走,那些日子不再有,一句话,一辈子,一生情,一杯酒,朋友不曾孤单过,一声朋友你会懂,还有伤,还有痛,还要走,还有我";
        //方法一
        lyric.replace("。",",");
        String [] lyricArr = lyric.split(",");//字符串转换成字符数组
        int count = 0;
        String keyWord = "朋友";
        for(int i=0;i<lyricArr.length;i++ ){
            if(lyricArr[i].contains(keyWord)){
                count++;
            }
        }
        System.out.println(keyWord+"出现了"+count+"次");
        // 方法二
        int num =0;
        while (lyric.indexOf(keyWord)!=-1){
            lyric =lyric.substring(lyric.indexOf(keyWord)+1);
            num++;
        }
        System.out.println(keyWord+"出现了"+num+"次");
    }
}
