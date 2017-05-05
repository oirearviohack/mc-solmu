package mc.solmu.geometry;
import static mc.solmu.geometry.util.JsonUtil.readJson;

import java.io.IOException;

import javax.swing.JFrame;

import mc.solmu.geometry.ui.PolygonPanel;
import mc.solmu.geometry.util.GeopointSet;

public class GeometryMain {
    private static PolygonPanel panel;

    private static GeopointSet getGeopointSet(int i) throws IOException {
        return new GeopointSet(readJson(
                "C:\\Users\\mauno.rönkkö\\ODA\\HACKATHON\\GIT\\mc-solmut\\oda-epidemic-service\\src\\main\\resources\\data\\frame_" + i
                        + ".json"));
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        JFrame frame = new JFrame("Geometry test");
        panel = new PolygonPanel(getGeopointSet(1));
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setContentPane(panel);
        frame.pack();
        frame.setVisible(true);
        //System.exit(0);
        //panel.syncSet(getGeopointSet(1));
        //(new Thread(new GeometryMain())).start();
        for (int i = 0; i < 86; i++) {
            panel.syncSet(getGeopointSet(i));
            Thread.sleep(200);
        }
        //System.out.println(getGeopointSet(30).getConvexHull().exportGeoPolygon());
    }
}
