package mc.solmu.geometry.util;
import java.io.IOException;
import java.nio.file.*;

public class JsonUtil {
    public static String readJson(String filename) throws IOException {
        return new String(Files.readAllBytes(Paths.get(filename)));
    }
}
