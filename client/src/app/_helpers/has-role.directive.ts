import {
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { Role } from "../_models";

@Directive({
  selector: "[hasRoles]",
  standalone: true,
})
export class HasRoleDirective implements OnChanges {
  private roles: Role[] = [];

  @Input() set hasRoles(roles: Role[]) {
    this.roles = roles;
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}
  ngOnChanges(): void {
    this.updateView();
  }

  updateView(): void {
    this.authService.isLoggedIn.subscribe((value: boolean) => {
      if (value) {
        if (this.roles.includes(this.authService.role)) {
          console.log("Role is", this.authService.role);
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
