package mc.solmu.geometry;
import static mc.solmu.geometry.util.JsonUtil.readJson;

import java.io.IOException;

import javax.swing.JFrame;

import mc.solmu.geometry.ui.PolygonPanel;
import mc.solmu.geometry.util.GeopointSet;

public class GeometryMain {
    public static void main(String[] args) throws IOException {
        JFrame frame = new JFrame("Geometry test");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setContentPane(new PolygonPanel(new GeopointSet(readJson("frame_0.json"))));
        frame.pack();
        frame.setVisible(true);
        //System.exit(0);
    }
}
