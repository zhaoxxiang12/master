package DealAnomaly;

/**
 * 年龄异常(自定义异常)
 * class AgeException extends RuntimeException 定义为我们自己使用的运行时异常
 */
public class AgeException extends RuntimeException{
    public AgeException() {
        super();
    }

    public AgeException(String message) {
        super(message);
    }

    public AgeException(String message, Throwable cause) {
        super(message, cause);
    }

    public AgeException(Throwable cause) {
        super(cause);
    }

    protected AgeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
