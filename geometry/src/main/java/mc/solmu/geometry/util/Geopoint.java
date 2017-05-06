package mc.solmu.geometry.util;

import static java.lang.Double.parseDouble;

import java.awt.geom.Point2D;

public class Geopoint extends Point2D.Double {
    private static double sqr(double a) {
        return a * a;
    }

    public Geopoint(Geopoint p) {
        super(p.x, p.y);
    }

    public Geopoint(double longitude, double latitude) {
        super(longitude, latitude);
    }

    public Geopoint(String longitude, String latitude) {
        super(parseDouble(longitude.trim()), parseDouble(latitude.trim()));
    }

    public void sum(Geopoint p) {
        this.x+=p.x;
        this.y+=p.y;
    }

    public void multiply(double c) {
        this.x*=c;
        this.y*=c;
    }

    public double distanceTo(Geopoint p) {
        return Math.sqrt(sqr(x - p.x) + sqr(y - p.y));
    }

    public double angle(Geopoint b) {
        double dy = y - b.y;
        double dx = b.x - x;
        double angle = Math.atan(dy / dx);
        if (dx < 0 && dy >= 0)
            angle = angle + Math.PI;
        else if (dx < 0 && dy < 0)
            angle = angle + Math.PI;
        else if (dx >= 0 && dy < 0)
            angle = angle + 2 * Math.PI;
        return angle;
    }

    public String exportGeoJson() {
        //return "ol.proj.fromLonLat([" + x + "," + y + "])";
        return "[" + x + "," + y + "]";
    }
}
