package com.backend.movieticketbooking.enums;

import java.util.Set;


public enum RoleEnum {
    CUSTOMER(Set.of(PermissionEnum.READ, PermissionEnum.WRITE)),
    ADMIN(Set.of(PermissionEnum.WRITE, PermissionEnum.READ, PermissionEnum.CREATE, PermissionEnum.DELETE));

    private final Set<PermissionEnum> permissions;

    RoleEnum(Set<PermissionEnum> permissions) {
        this.permissions = permissions;
    }

    public Set<PermissionEnum> getPermissions() {
        return permissions;
    }
}
