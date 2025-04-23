import { Module } from "@nestjs/common";

import { RegisterUserAccountController } from "./controllers/user/register-account.controller";
import { ParentsModule } from "./controllers/parents/parents.module";
import { ChildrenModule } from "./controllers/children/children.module";
import { TestersModule } from "./controllers/testers/testers.module";
import { TestItemsModule } from "./controllers/test-items/test-items.module";
import { TestSessionsModule } from "./controllers/test-sessions/test-sessions.module";
import { TestResultsModule } from "./controllers/test-results/test-results.module";
import { DevelopmentalAlertsModule } from "./controllers/developmental-alerts/developmental-alerts.module";
import { UsersModule } from "./controllers/users/users.module";
import { EmailVerificationsModule } from "./controllers/email-verifications/email-verifications.module";
import { PasswordResetsModule } from "./controllers/password-resets/password-resets.module";
import { AuditLogsModule } from "./controllers/audit-logs/audit-logs.module";

@Module({
    imports: [
        ParentsModule,
        ChildrenModule,
        TestersModule,
        TestItemsModule,
        TestSessionsModule,
        TestResultsModule,
        DevelopmentalAlertsModule,
        UsersModule,
        EmailVerificationsModule,
        PasswordResetsModule,
        AuditLogsModule
    ],
    controllers: [
        RegisterUserAccountController,
    ],
    providers: [],
})
export class HttpModule { }
