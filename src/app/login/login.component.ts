﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import sdk from '@gooddata/gooddata-js';
import { AlertService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    setErrorCheckingProjectAvailability(error: any) {
        throw new Error('Method not implemented.');
    }
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    get username() { return this.loginForm.get('username'); }
    get password() { return this.loginForm.get('password'); }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        sdk.user
            .login(this.username.value, this.password.value).then(
                data => {
                    console.log('==> Navigate to home');
                    this.router.navigateByUrl('/basic-components');
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }
}
