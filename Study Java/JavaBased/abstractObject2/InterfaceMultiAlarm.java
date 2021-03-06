package abstractObject2;

/**
 * 多功能型接口;火警 烟感检测 视频录像功能
 *
 * 接口不能实现接口  接口只能继承接口
 * class 是单继承的 接口是多继承的
 *
 *类最终是实现接口
 *
 * 由于接口的多继承最终实现了Java的多重继承,从而弥补了Java单继承的缺陷
 */
public interface InterfaceMultiAlarm extends InterfaceFireAlarm,InterfaceMonitor {

}
