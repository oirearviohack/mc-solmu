package mc.solmu.geometry.util;

import java.awt.Polygon;
import java.util.*;

public class GeopointSet {
    private ArrayList<Geopoint> set;

    public GeopointSet() {
        set = new ArrayList<>();
    }

    public GeopointSet(GeopointSet original) {
        this();
        original.set.stream().forEach(p->set.add(new Geopoint(p)));
    }

    public GeopointSet(String json) {
        this();
        String[] coordinates = json.split("\"coordinates\":");
        for (int i = 0; i < coordinates.length - 1; i++) {
            String[] points = coordinates[i + 1].split("]")[0].trim().substring(1).split(",");
            set.add(new Geopoint(points[0], points[1]));
        }
    }

    public List<Geopoint> getSet() {
        return set;
    }

    private void add(Geopoint p) {
        set.add(p);
    }

    public GeopointSet translateToSwing() {
        GeopointSet copy = new GeopointSet();
        set.stream().forEach(p -> copy.add(new Geopoint((p.x - 24.8) * 1500 + 50, (p.y - 60.4) * 2000 + 400)));
        return copy;
    }

    public Polygon getPolygon() {
        Polygon polygon = new Polygon();
        set.stream().forEachOrdered(p -> polygon.addPoint((int) p.x, (int) p.y));
        return polygon;
    }

    private int findHullCorner() {
        int index = 0;
        double x = set.get(0).x;
        double y = set.get(0).y;
        for (int i = 1; i < set.size(); i++)
            if (set.get(i).y < y || (set.get(i).y == y && set.get(i).x > x)) {
                x = set.get(i).x;
                y = set.get(i).y;
                index = i;
            }
        return index;
    }

    private int findBiggestAngle(int toIndex, double max) {
        int index = -1;
        double angle = -1;
        Geopoint point = set.get(toIndex);
        for (int i = 0; i < set.size(); i++) {
            double na = point.angle(set.get(i));
            if (i != toIndex && na > angle && na <= max) {
                index = i;
                angle = point.angle(set.get(i));
            }
        }
        return index;
    }

    public GeopointSet getConvexHull() {
        GeopointSet result = new GeopointSet();
        int corner = findHullCorner();
        double max = Math.PI * 2;
        result.add(set.get(corner));
        while (corner >= 0) {
            int previous = corner;
            corner = findBiggestAngle(corner, max);
            if (corner >= 0) {
                max = set.get(previous).angle(set.get(corner));
                result.add(set.get(corner));
            }
        }
        return result;
    }

    public Geopoint getCenter() {
        Geopoint center = new Geopoint(0, 0);
        set.stream().forEach(p -> center.sum(p));
        center.multiply(1.0 / set.size());
        return center;
    }

    private int findFurthest(Geopoint origin) {
        int index = 0;
        double distance = origin.distanceTo(set.get(0));
        for (int i = 1; i < set.size(); i++) {
            double newDist = origin.distanceTo(set.get(i));
            if (newDist > distance) {
                index = i;
                distance = newDist;
            }
        }
        return index;
    }

    public GeopointSet getFraction(int percentage) {
        int targetSize = percentage * set.size() / 100;
        if (targetSize <= 0)
            return new GeopointSet();
        GeopointSet result=new GeopointSet(this);
        if (targetSize > set.size())
            return result;
        do {
            Geopoint center = result.getCenter();
            result.set.remove(result.findFurthest(center));
        } while (result.set.size() > targetSize);
        return result;
    }

}
