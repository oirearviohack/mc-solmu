package fi.oda.epidemic.profiles;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.context.annotation.Profile;

@DevProfile
@Profile("dev")
@Retention(RetentionPolicy.RUNTIME)
@Target(
    { ElementType.TYPE, ElementType.METHOD })
public @interface DevProfile {
}
