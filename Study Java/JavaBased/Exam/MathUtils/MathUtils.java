package Exam.MathUtils;

public class MathUtils {
    private int year;
    private String phoneNumber;

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
    public boolean IsLeapYear(int year){
        if(year<0){
            return false;
        }
        return (year%4==0&&year%100!=0||year%400==0);
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean IsRightPhoneNumber(String phoneNumber){
        if(phoneNumber.length()<11){
            return false;
        }
        return (phoneNumber.startsWith("13")||phoneNumber.startsWith("14")||phoneNumber.startsWith("16")||phoneNumber.startsWith("18"));
    }
}
