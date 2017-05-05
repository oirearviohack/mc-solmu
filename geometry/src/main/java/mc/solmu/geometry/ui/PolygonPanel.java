package mc.solmu.geometry.ui;

import java.awt.*;

import javax.swing.JPanel;

import mc.solmu.geometry.util.*;

public class PolygonPanel extends JPanel {
    private GeopointSet points;

    public PolygonPanel(GeopointSet points) {
        super();
        setPreferredSize(new Dimension(600, 600));
        this.points = points.translateToSwing();
    }

    private void draw(Graphics g, Geopoint point, int size) {
        g.fillOval((int) point.x - size / 2, (int) point.y - size / 2, size, size);
    }

    private void draw(Graphics g, GeopointSet set) {
        for (Geopoint p : set.getSet())
            draw(g, p, 16);
    }

    public void paint(Graphics g) {
        super.paint(g);
        g.setColor(Color.WHITE);
        g.fillRect(0, 0, 600, 600);
        g.setColor(new Color(255, 255, 0, 128));
        g.fillPolygon(points.getConvexHull().getPolygon());
        g.setColor(new Color(255, 128, 0, 128));
        g.fillPolygon(points.getFraction(80).getConvexHull().getPolygon());
        g.setColor(new Color(255, 0, 0, 128));
        g.fillPolygon(points.getFraction(50).getConvexHull().getPolygon());
        g.setColor(new Color(128, 0, 0));
        draw(g, points);
        //g.setColor(Color.BLACK);
        //draw(g, points.getCenter(), 20);
    }
}
