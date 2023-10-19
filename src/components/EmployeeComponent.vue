<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg py-0 px-3" data-bs-toggle="modal"
            data-bs-target="#employeeModal">
            <i class="bi bi-person-add"></i>
        </button>

        <!-- Modal -->
        <div class="modal fade" data-bs-backdrop="static" id="employeeModal" tabindex="-1"
            aria-labelledby="employeeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="employeeModalLabel">Add Employee</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit="create">
                            <div class="mb-3">
                                <label for="name" class="form-label text-align-left d-flex">Name</label>
                                <input type="text" class="form-control" v-model="data.name" required id="name"
                                    placeholder="Enter Name">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label text-align-left d-flex">Password</label>
                                <input type="password" class="form-control" v-model="data.password" required id="password"
                                    placeholder="Enter Password">
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label text-align-left d-flex">Phone</label>
                                <input type="number" class="form-control" v-model="data.contact_number" required id="phone"
                                    placeholder="Enter Phone Number">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label text-align-left d-flex">Email</label>
                                <input type="email" class="form-control" v-model="data.email" required id="email"
                                    placeholder="Enter Email">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <h1>Employee Data</h1>
        <div class="container table-responsive">
            <table class="table border">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <h2 style="text-align: center;
                position: absolute;
                top: 30%;
                left: 50%;
                transform: translate(-50%, -50%);" class="text-warning" v-if="loading">Loading...</h2>
                <tbody>
                    <tr v-for="item in list" v-bind:key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.phone_number }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <button class="btn btn-outline-info me-1 btn-sm" v-on:click="edit(item.id)">Edit</button>
                            <button class="btn btn-outline-danger btn-sm" v-on:click="deleteUser(item.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>
<script>
import { Modal } from 'bootstrap';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios)
export default {
    name: 'EmployeeComponent',
    data() {
        return {
            data: {
                name: null,
                email: null,
                password: null,
                contact_number: null
            },
            currentPage: 1,
            perPage: 5,

            modal: null,
            list: undefined,
            loading: false,
        }
    },
    mounted() {
        this.getUser();
        this.modal = new Modal(document.getElementById('employeeModal'), {})
    },
    methods: {
        async getUser() {
            this.loading = true
            try {
                await this.axios.get('http://127.0.0.1:8000/api/employee').then(resp => {
                    this.list = resp.data,
                        console.log(resp.data)
                });
            } catch (error) {
                console.error(error);
            }
            this.loading = false
        },
        resetData() {
            this.data.name = null;
            this.data.email = null;
            this.data.password = null;
            this.data.contact_number = null;
        },
        create(e) {
            axios.post('http://127.0.0.1:8000/api/employee', this.data).then(() => {
                // console.warn(this.data);
                this.resetData();
                this.modal.toggle();
                this.getUser();
            })
            e.preventDefault();
        },
        deleteUser(id) {
            axios.delete('http://127.0.0.1:8000/api/employee/' + id).then((result) => {
                console.warn(result)
                this.getUser();
            })
        },
        edit(id) {
            axios.get(`http://127.0.0.1:8000/api/employee/${id}/edit`).then(resp => {
                console.warn(resp.data.key.email);
            });
        }

    }
}
</script>