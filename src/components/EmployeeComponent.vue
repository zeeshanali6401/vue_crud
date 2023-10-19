<template>
    <div>
        <!-- Button trigger create modal -->
        <button type="button" class="btn btn-primary btn-lg py-0 px-3" data-bs-toggle="modal"
            data-bs-target="#employeeModal">
            <i class="bi bi-person-add"></i>
        </button>
        <!--Create = Modal -->
        <div class="modal fade" data-bs-backdrop="static" id="employeeModal" tabindex="-1"
            aria-labelledby="employeeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="employeeModalLabel">Add Employee</h1>
                        <button type="button" class="btn-close" v-on:click="toggleModal('create')"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit="create">
                            <div class="mb-3">
                                <label for="name" class="form-label text-align-left d-flex">Name</label>
                                <input type="text" class="form-control" v-model="data.name" id="name"
                                    placeholder="Enter Name">
                                <span class="text-danger" v-if="error.name">{{ error.name[0] }}</span>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label text-align-left d-flex">Password</label>
                                <input type="password" class="form-control" v-model="data.password" id="password"
                                    placeholder="Enter Password">
                                <span class="text-danger" v-if="error.password">{{ error.password[0] }}</span>

                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label text-align-left d-flex">Phone</label>
                                <input type="number" class="form-control" v-model="data.phone_number" id="phone"
                                    placeholder="Enter Phone Number">
                                <span class="text-danger" v-if="error.phone_number">{{ error.phone_number[0] }}</span>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label text-align-left d-flex">Email</label>
                                <input type="email" class="form-control" v-model="data.email" id="email"
                                    placeholder="Enter Email">
                                <span class="text-danger" v-if="error.email">{{ error.email[0] }}</span>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    v-on:click="toggleModal('create')">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <!-- Edit-Update Modal -->
        <div class="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title text-warning fs-5" id="editModalLabel">Update Record <strong
                                class="text-info">{{ editCollection.name }}</strong>?</h1>
                        <button type="button" class="btn-close" v-on:click="toggleModal()" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit="update">
                            <div class="mb-3">
                                <label for="name" class="form-label text-align-left d-flex">Name</label>
                                <input type="text" v-if="editCollection" v-model="editCollection.name" class="form-control"
                                    required placeholder="Enter Name">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label text-align-left d-flex">Email</label>
                                <input type="email" class="form-control" v-if="editCollection"
                                    v-model="editCollection.email" required placeholder="Enter Email">
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label text-align-left d-flex">Phone</label>
                                <input type="tel" v-if="editCollection" class="form-control"
                                    v-model="editCollection.phone_number" required placeholder="Enter Phone Number">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label text-align-left d-flex">Password</label>
                                <input type="password" v-if="editCollection" class="form-control"
                                    v-model="editCollection.password" required placeholder="Enter Password">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" v-on:click="toggleModal()">Close</button>
                                <button type="submit" class="btn btn-primary">Update</button>
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
                            <button class="btn btn-outline-info me-1 btn-sm" v-on:click="edit(item.id)"
                                data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
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
                password: '',
                phone_number: null
            },
            editCollection: {
                id: null,
                name: null,
                email: null,
                phone_number: null,
                password: null,
            },
            error: { name: null, password: null, email: null, phone_number: null },
            createModal: null,
            updateModal: null,
            list: undefined,
            loading: false,
        }
    },
    mounted() {
        this.getUser();
        this.createModal = new Modal(document.getElementById('employeeModal'));
        this.updateModal = new Modal(document.getElementById('editModal'));
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
            this.data.phone_number = null;
            this.error = { name: null, password: null, email: null, phone_number: null };
        },
        create(e) {
            axios.post('http://127.0.0.1:8000/api/employee', this.data).then((resp) => {
                // console.warn(resp.data.validation_message);
                this.error = resp.data.validation_message;
                if (!resp.data.validation_message) {
                    this.resetData();
                    this.createModal.toggle();
                    this.getUser();
                }
            })
            e.preventDefault();
        },
        deleteUser(id) {
            axios.delete('http://127.0.0.1:8000/api/employee/' + id).then(() => {
                this.getUser();
            })
        },
        edit(id) {
            axios.get(`http://127.0.0.1:8000/api/employee/${id}/edit`).then(resp => {
                this.editCollection = resp.data.key;
            });
        },
        update(e) {
            axios.put(`http://127.0.0.1:8000/api/employee/${this.editCollection.id}`, this.editCollection).then(() => {
                // console.warn(resp);
                this.resetData();
                this.updateModal.toggle();
                this.getUser();
            })
            e.preventDefault();
        },
        toggleModal(type) {
            if (type === 'create') {
                this.createModal.toggle();
            } else {
                this.updateModal.toggle();
            }
            this.resetData();

        }
    }
}
</script>