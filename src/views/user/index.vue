<template>
  <div class="user-body"
       v-loading="listLoading">
    <div class="user-info">
      <div class="user-info-img">
        <el-image
          class="user-info-img-img"
          :src="avatar"
          fit="cover"></el-image>
      </div>
      <div class="user-info-text">
        <div class="user-info-name">
          {{ name }}
        </div>
        <router-link to="/user/edit">
          <div class="user-info-edit">
            <svg-icon icon-class="edit"/>
            编辑个人信息
          </div>
        </router-link>
        <div class="user-info-word">
          您已在本网站注册
          <span class="user-info-word-num">
            {{ this.userInfo.days }}
          </span>
          天，这些天中您捐粮
          <span class="user-info-word-num">
            {{
              this.userInfo.foodNum !== null && this.userInfo.foodNum !== undefined ? this.userInfo.foodNum : 0
            }}
          </span>
          kg，捐款
          <span class="user-info-word-num">
            {{
              this.userInfo.moneyNum !== null && this.userInfo.moneyNum !== undefined ? this.userInfo.moneyNum : 0
            }}
          </span>
          元。接受您捐赠的用户、基地和受到帮助的小动物对您感激不尽。
        </div>
      </div>
    </div>
    <div class="user-list">
      <el-tabs
        type="border-card"
        :stretch="true"
        :value="tabChoose"
        tab-position="left"
        :before-leave="changTab"
        class="user-list-tab">
        <div class="user-list-search" v-if="tabChoose !== 'info'">
          <el-input
            class="user-list-tab-search"
            type="text"
            placeholder="请输入内容"
            v-model="table.searchValue"
            maxlength="10"
            show-word-limit
            clearable
            prefix-icon="el-icon-search"
          />
          <el-button class="user-list-tab-button" type="success" plain icon="el-icon-search" @click="search">搜索
          </el-button>
        </div>
        <el-tab-pane label="基本信息" name="info">
          <div class="user-list-tab-info">
            <div class="user-list-tab-info-label">
              所在地：
            </div>
            <div class="user-list-tab-info-text" v-if="userInfo.address != null && userInfo.address != []">
              {{
                pcaa[86][userInfo.address[0]]
              }}-
              {{
                pcaa[userInfo.address[0]][userInfo.address[1]]
              }}-
              {{
                pcaa[userInfo.address[1]][userInfo.address[2]]
              }}
            </div>
          </div>
          <div class="user-list-tab-info" v-if="userInfo.isBase === 'YES' && userInfo.baseCreateTime">
            <div class="user-list-tab-info-label">
              基地建立时间：
            </div>
            <div class="user-list-tab-info-text">
              {{ $moment(userInfo.baseCreateTime).format('YYYY-MM-DD') }}
            </div>
          </div>
          <div class="user-list-tab-info">
            <div class="user-list-tab-info-label">
              联系邮箱：
            </div>
            <div class="user-list-tab-info-text">
              {{ userInfo.email }}
            </div>
          </div>
          <div class="user-list-tab-info">
            <div class="user-list-tab-info-label">
              帮助过的动物数量：
            </div>
            <div class="user-list-tab-info-text">
              {{ userInfo.adoptNum + userInfo.rescueNum }}
            </div>
          </div>
          <div class="user-list-tab-info">
            <div class="user-list-tab-info-label">
              描述：
            </div>
            <div class="user-list-tab-info-text user-list-tab-info-describe">
              {{ userInfo.describes }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="救助信息" name="rescue">
          <el-table :data="tableList" border fit>
            <el-table-column label="发布人" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.findUserName }}
              </template>
            </el-table-column>
            <el-table-column label="救助人" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.rescueUserName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="动物昵称" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.animal.name }}
              </template>
            </el-table-column>
            <el-table-column label="描述" show-overflow-tooltip width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.describes }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{
                    statusOption.find(function (value) {
                      return value.value === scope.row.status;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="是否审核通过" width="110" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isApproved | isFilter">
                  {{
                    isOptions.find(function (value) {
                      return value.value === scope.row.isApproved;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="getInfo(scope.row)">详情</el-button>
                <el-button type="text" @click="updateInfo(scope.row)">编辑</el-button>
                <el-button v-if="id === scope.row.findUser" type="text" @click="deleteInfo(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="领养信息" name="adopt">
          <el-table :data="tableList" border fit>
            <el-table-column label="发布人" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.publisherName }}
              </template>
            </el-table-column>
            <el-table-column label="领养人" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.adoptUserName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="动物昵称" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.animal.name }}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="领养要求" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.requirement }}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="领养前情况" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.beforSituation }}</span>
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="是否审核通过" width="110" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isApproved | isFilter">{{
                    isOptions.find(function (value) {
                      return value.value === scope.row.isApproved;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{
                    statusOption.find(function (value) {
                      return value.value === scope.row.status;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="getInfo(scope.row)">详情</el-button>
                <el-button type="text" @click="updateInfo(scope.row)">编辑</el-button>
                <el-button v-if="id === scope.row.publisher" type="text" @click="deleteInfo(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="资源对接信息" name="resource">
          <el-table :data="tableList" border fit>
            <el-table-column label="捐献者" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.donorName }}
              </template>
            </el-table-column>
            <el-table-column label="需求者" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.giveeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="对接类型" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{
                    typeOption.find(function (value) {
                      return value.value === scope.row.type;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="物资类别" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>
                  {{
                    materialOptions.find(function (value) {
                      return value.value === scope.row.materialCategory;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="数量|金额" width="95" align="center">
              <template slot-scope="scope">
                {{ scope.row.amount }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{
                    statusOption.find(function (value) {
                      return value.value === scope.row.status;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="是否审核通过" width="110" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isApproved | isFilter">{{
                    isOptions.find(function (value) {
                      return value.value === scope.row.isApproved;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="getInfo(scope.row)">详情</el-button>
                <el-button type="text" @click="updateInfo(scope.row)">编辑</el-button>
                <el-button v-if="id === scope.row.createUser" type="text" @click="deleteInfo(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-pagination
          v-if="tabChoose !== 'info'"
          class="page-component"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="table.page"
          @current-change="currentChange"
        />
      </el-tabs>
    </div>
    <div class="user-dialog">
      <el-dialog top="0" :title="dialogTitile" :visible.sync="rescueDialogVisible" v-if="rescueDialogVisible">
        <el-form label-position="top" ref="rescueForm" :model="form" :disabled='disabledForm'
                 :rules="rescueFormRules">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="动物昵称" prop="animalDtoReq.name">
                <el-input v-model="form.animalDtoReq.name"
                          type="text"
                          :disabled="!form.findUser === id"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="动物年龄" prop="animalDtoReq.age">
                <el-input-number
                  v-model="form.animalDtoReq.age"
                  :step="1"
                  :min="0"
                  :disabled="!form.findUser === id"
                  :max="99"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="动物性别" prop="animalDtoReq.sex">
                <el-select
                  clearable
                  v-model="form.animalDtoReq.sex"
                  placeholder="请选择性别"
                  :disabled="!form.findUser === id">
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="种类" prop="animalDtoReq.type">
                <el-select clearable v-model="form.animalDtoReq.type" placeholder="请选择种类">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="救助时间" prop="rescueTime">
                <el-date-picker
                  style="width: auto;"
                  v-model="form.rescueTime"
                  type="datetime"
                  placeholder="选择日期时间"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="发现地址" prop="animalDtoReq.location">
                <area-select v-if="rescueDialogVisible"
                             :disabled="disabledForm && !form.findUser === id"
                             v-model="form.animalDtoReq.location"
                             :data="pcaa"
                             :level="2"></area-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="发现地址-详细" prop="findLocation">
                <el-input v-model="form.findLocation"
                          type="textarea"
                          :disabled="!form.findUser === id"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发现时情况" prop="findSituation">
                <el-input v-model="form.findSituation"
                          type="textarea"
                          :disabled="!form.findUser === id"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="救助后情况" prop="afterSituation">
                <el-input v-model="form.afterSituation"
                          type="textarea"
                          :disabled="!form.rescueUser === id"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="描述" prop="describes">
                <el-input v-model="form.describes"
                          type="textarea"
                          :disabled="!form.findUser === id"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="需要的物品" prop="neededItems">
                <el-input v-model="form.neededItems"
                          type="textarea"
                          :disabled="!form.findUser === id"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="救助过程" prop="process">
                <el-input v-model="form.process"
                          type="textarea"
                          :disabled="!form.rescueUser === id"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="救助前照片" prop="animalDtoReq.">
                <el-upload
                  class="avatar-uploader"
                  :action="url"
                  :show-file-list="false"
                  :disabled="!form.findUser === id"
                  :on-success="handleAvatarSuccessbeforRescue"
                >
                  <img v-if="beforRescueUrl" :src="beforRescueUrl" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="救助后照片">
                <el-upload
                  class="avatar-uploader"
                  :action="url"
                  :show-file-list="false"
                  :disabled="!form.rescueUser === id"
                  :on-success="handleAvatarSuccessafterRescue"
                >
                  <img v-if="afterRescueUrl" :src="afterRescueUrl" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="rescueDialogVisible = false">取 消</el-button>
          <el-button v-if="dialogTitile != '详情'" type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog top="0" :title="dialogTitile" :visible.sync="adoptDialogVisible" v-if="adoptDialogVisible">
        <el-form label-position="top" ref="adoptForm" :model="form" :disabled='disabledForm' :rules="adoptFormRules">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="动物昵称" prop="animalDtoReq.name">
                <el-input v-model="form.animalDtoReq.name"
                          type="text"
                          :disabled="!form.publisher === id"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="动物年龄" prop="animalDtoReq.age">
                <el-input-number
                  v-model="form.animalDtoReq.age"
                  :step="1"
                  :min="0"
                  :disabled="!form.publisher === id"
                  :max="99"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="动物性别" prop="animalDtoReq.sex">
                <el-select
                  clearable
                  v-model="form.animalDtoReq.sex"
                  placeholder="请选择性别"
                  :disabled="!form.publisher === id">
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="种类" prop="animalDtoReq.type">
                <el-select clearable v-model="form.type" placeholder="请选择种类">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="领养时间" prop="adoptTime">
                <el-date-picker
                  style="width: auto"
                  v-model="form.adoptTime"
                  type="datetime"
                  placeholder="选择日期时间"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="领养地址" prop="animalDtoReq.location">
                <area-select v-if="adoptDialogVisible"
                             :disabled="disabledForm && !form.publisher === id"
                             v-model="form.animalDtoReq.location"
                             :data="pcaa"
                             :level="2"></area-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="领养要求" prop="requirement">
                <el-input v-model="form.requirement"
                          type="textarea"
                          :disabled="!form.publisher === id"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="领养前情况" prop="beforSituation">
                <el-input v-model="form.beforSituation"
                          type="textarea"
                          :disabled="!form.publisher === id"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="领养后情况" prop="afterSituation">
                <el-input v-model="form.afterSituation"
                          type="textarea"
                          :rows="2"
                          :disabled="form.publisher === id"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="领养过程" prop="process">
                <el-input v-model="form.process"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="领养前照片">
                <el-upload
                  class="avatar-uploader"
                  :action="url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessbeforAdopt"
                >
                  <img v-if="beforAdoptUrl" :src="beforAdoptUrl" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="领养后照片">
                <el-upload
                  class="avatar-uploader"
                  :action="url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessafterAdopt"
                >
                  <img v-if="afterAdoptUrl" :src="afterAdoptUrl" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adoptDialogVisible = false">取 消</el-button>
          <el-button v-if="dialogTitile != '详情'" type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog top="0" :title="dialogTitile" :visible.sync="resourceDialogVisible" v-if="resourceDialogVisible">
        <el-form label-position="top" ref="resourceForm" :model="form" :disabled='disabledForm'
                 :rules="resourceFormRules">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"
                          :disabled="!form.donor === id"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="标签" prop="label">
                <el-select v-model="form.label" multiple placeholder="请选择标签" :disabled="!form.donor === id">
                  <el-option
                    v-for="item in labelOption"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对接时间" prop="collectionTime">
                <el-date-picker
                  style="width: auto;"
                  v-model="form.collectionTime"
                  type="datetime"
                  placeholder="选择日期时间"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="对接类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择对接类型" :disabled="!form.donor === id">
                  <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物资类别" prop="materialCategory" :disabled="!form.donor === id">
                <el-select v-model="form.materialOptions" placeholder="请选择物资类别">
                  <el-option
                    v-for="item in materialOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="地点" prop="location">
                <area-select v-if="resourceDialogVisible" :disabled="disabledForm" v-model="form.location" :data="pcaa"
                             :level="2"></area-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="金额|数量" prop="amount">
                <el-input v-model="form.amount"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对接过程" prop="process">
                <el-input v-model="form.process"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="描述" prop="describes">
                <el-input v-model="form.describes"
                          type="textarea"
                          :disabled="!form.donor === id"
                          :rows="2"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-upload
                :limit="4"
                class="upload-demo"
                :action="url"
                :on-remove="handleRemove"
                :on-success="fileUploadSuccess"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传图片</el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resourceDialogVisible = false">取 消</el-button>
          <el-button v-if="dialogTitile != '详情'" type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {queryById} from '@/api/user'
import {deletedAdopt, getAdoptList, updateAdopt} from '@/api/adopt'
import {deletedRescue, getRescueList, updateRescue} from "@/api/resuce";
import {deletedResource, getResourceList, updateResource} from "@/api/resource";
import {pcaa} from 'area-data';
import {mapGetters} from "vuex";
import {getLabelList} from "@/api/label";

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id'
    ])
  },
  filters: {
    isFilter(status) {
      const statusMap = {
        YES: 'success',
        NO: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      //上传图片链接
      url: this.$store.state.settings.url + 'picture/upload',
      //动物图片
      beforRescueUrl: '',
      afterRescueUrl: '',
      beforAdoptUrl: '',
      afterAdoptUrl: '',
      //对话框标题
      dialogTitile: '',
      //对话框中绑定数据
      form: {},
      //表单是否可编辑
      disabledForm: false,
      //救助信息对话框可视化变量
      rescueDialogVisible: false,
      //救助信息表单验证规则
      rescueFormRules: {
        "animalDtoReq.name": [
          {required: true, message: '请输入动物昵称', trigger: 'blur'}
        ],
        "animalDtoReq.age": [
          {required: true, message: '请输入动物年龄（大致）', trigger: 'blur'}
        ],
        "animalDtoReq.sex": [
          {required: true, message: '请选择动物性别', trigger: 'blur'}
        ],
        "animalDtoReq.location": [
          {required: true, message: '请选择发现地点', trigger: 'blur'}
        ],
        findLocation: [
          {required: true, message: '请选择发现详细地址', trigger: 'blur'}
        ],
        "animalDtoReq.type": [
          {required: true, message: '请选择动物种类', trigger: 'blur'}
        ],
        describes: [
          {required: true, message: '请输入描述', trigger: 'blur'}
        ],
        neededItems: [
          {required: true, message: '请输入救助需要的物品', trigger: 'blur'}
        ],
      },
      //领养信息对话框可视化变量
      adoptDialogVisible: false,
      //领养信息表单验证规则
      adoptFormRules: {
        "animalDtoReq.name": [
          {required: true, message: '请输入动物昵称', trigger: 'blur'}
        ],
        "animalDtoReq.age": [
          {required: true, message: '请输入动物年龄（大致）', trigger: 'blur'}
        ],
        "animalDtoReq.sex": [
          {required: true, message: '请选择动物性别', trigger: 'blur'}
        ],
        "animalDtoReq.location": [
          {required: true, message: '请选择领养地点', trigger: 'blur'}
        ],
        requirement: [
          {required: true, message: '请输入领养要求', trigger: 'blur'}
        ],
        "animalDtoReq.type": [
          {required: true, message: '请选择动物种类', trigger: 'blur'}
        ],
        beforSituation: [
          {required: true, message: '请输入领养前情况', trigger: 'blur'}
        ],
      },
      //资源对接信息对话框可视化变量
      resourceDialogVisible: false,
      //资源对接信息表单验证规则
      resourceFormRules: {
        location: [
          {required: true, message: '请选择所在地', trigger: 'blur'}
        ],
        describes: [
          {required: true, message: '请输入描述', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择对接类型', trigger: 'blur'}
        ],
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        materialCategory: [
          {required: true, message: '请选择物资类别', trigger: 'blur'}
        ],
        amount: [
          {required: true, message: '请输入金额|数量', trigger: 'blur'}
        ]
      },
      //资源对接图片
      fileList: [],
      //当前选择为哪个tab
      tabChoose: 'info',
      //当前tab展示的表格数据
      tableList: [],
      total: 0,
      //展示的数据
      resourceList: [],
      adoptList: [],
      rescueList: [],
      //用户信息
      userInfo: null,
      //地区数据
      pcaa: pcaa,
      // 加载变量
      listLoading: false,
      // 搜索值
      table: {
        searchValue: '',
        participantId: this.id,
        page: 1,
        pageSize: 10
      },
      // 是否选择
      isOptions: [
        {
          value: 'YES',
          label: '是'
        },
        {
          value: 'NO',
          label: '否'
        }
      ],
      //状态选择
      statusOption: [
        {
          value: 'UNCOMMIT',
          label: '信息未提交'
        },
        {
          value: 'UNAPPROVED',
          label: '信息未审核'
        },
        {
          value: 'WAITING',
          label: '等待对接人'
        },
        {
          value: 'TALKING',
          label: '双方沟通'
        },
        {
          value: 'UPLOAD',
          label: '上传过程'
        },
        {
          value: 'END',
          label: '结束'
        }
      ],
      //捐赠资源类型选择
      materialOptions: [
        {
          value: 'MONEY',
          label: '金钱'
        },
        {
          value: 'FOOD',
          label: '粮食'
        },
        {
          value: 'WARM',
          label: '保暖物品'
        },
        {
          value: 'OTHER',
          label: '其他'
        }
      ],
      // 资源对接类型选择
      typeOption: [
        {
          value: 'DONATE',
          label: '捐献'
        },
        {
          value: 'DEMAND',
          label: '需求'
        }
      ],
      //性别选择
      sexOptions: [
        {
          value: 'MAN',
          label: '♂'
        },
        {
          value: 'WOMAN',
          label: '♀'
        }
      ],
      // 动物种类选择
      typeOptions: [
        {
          value: 'CAT',
          label: '猫咪'
        },
        {
          value: 'DOG',
          label: '狗子'
        },
        {
          value: 'RABBIT',
          label: '兔子'
        },
        {
          value: 'HAMSTER',
          label: '仓鼠'
        },
        {
          value: 'SNAKE',
          label: '蛇'
        },
        {
          value: 'OTHER',
          label: '其他'
        }
      ],
    }
  },
  created() {
    var search = {
      page: 1,
      pageSize: 999
    }
    this.getLabelOptions(search)
    this.fetchData(this.id)
    this.table.participantId = this.id
    this.getRescueData()
  },
  mounted() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#f3f3f3'
  },
  methods: {
    submit() {
      console.log(this.form)
      if (this.tabChoose === 'rescue') {
        this.$refs['rescueForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            this.form.rescueTime = Date.parse(this.form.rescueTime)

            updateRescue(this.form).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
                this.rescueDialogVisible = false
                this.getRescueData();
              } else {
                this.$message.error('更新失败');
              }
              this.listLoading = false
            })

          } else {
            this.$message.error('数据格式错误请检查！');
          }
        });
      } else if (this.tabChoose === 'adopt') {
        this.$refs['adoptForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            this.form.adoptTime = Date.parse(this.form.adoptTime)

            updateAdopt(this.form).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
                this.adoptDialogVisible = false
                this.getAdoptData()
              } else {
                this.$message.error('更新失败');
              }
              this.listLoading = false
            })

          } else {
            this.$message.error('数据格式错误请检查！');
          }
        });
      } else {
        let _that = this
        this.$refs['resourceForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            this.form.collectionTime = Date.parse(this.form.collectionTime)
            this.form.createUser = this.form.givee === null || this.form.givee === '' ? this.form.givee : this.form.donor
            this.form.photo = []
            if (this.fileList !== undefined && this.fileList !== null && this.fileList !== []) {
              for (let i = 0; i < this.fileList.length; i++) {
                if (this.fileList[i].response === undefined) {
                  _that.form.photo.push(this.fileList[i].id)
                } else {
                  _that.form.photo.push(this.fileList[i].response.data.id)
                }
              }
            }
            updateResource(this.form).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
                this.resourceDialogVisible = false
                this.getResourceData()
              } else {
                this.$message.error('更新失败');
              }
              this.listLoading = false
            })
          } else {
            this.$message.error('数据格式错误请检查！');
          }
        });
      }
    },
    setDialogInfo(row) {
      if (this.tabChoose === 'rescue') {
        this.rescueDialogVisible = true
        this.form = row
        this.form.animalDtoReq = row.animal
        this.beforRescueUrl = row.animal.beforRescuePhoto
        this.afterRescueUrl = row.animal.afterRescuePhoto
      } else if (this.tabChoose === 'adopt') {
        this.adoptDialogVisible = true
        this.form = row
        this.form.animalDtoReq = row.animal
        this.beforAdoptUrl = row.animal.beforAdoptPhoto
        this.afterAdoptUrl = row.animal.afterAdoptPhoto
      } else {
        this.resourceDialogVisible = true
        this.form = row
        if (this.form.photo === undefined) {
          this.form.photo = []
          this.fileList = []
        }
        this.fileList = row.photos
      }
    },
    getInfo(row) {
      this.dialogTitile = '详情'
      this.disabledForm = true
      this.setDialogInfo(row)
    },
    updateInfo(row) {
      this.dialogTitile = '编辑'
      this.disabledForm = false
      this.setDialogInfo(row)
    },
    deleteInfo(row) {
      this.$confirm('是否确认删除该条信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        if (row.status === 'UNCOMMIT' || row.status === 'UNAPPROVED' || row.status === 'WAITING') {
          if (this.tabChoose === 'rescue') {
            deletedRescue(row.id).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getRescueData()
              } else {
                this.$message.error('删除失败');
              }
            }).finally(() => {
              this.listLoading = false
            })
          } else if (this.tabChoose === 'adopt') {
            deletedAdopt(row.id).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getAdoptData()
              } else {
                this.$message.error('删除失败');
              }
              this.listLoading = false
              this.fetchData();
            })
          } else {
            deletedResource(row.id).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getResourceData()
              } else {
                this.$message.error('删除失败');
              }
            }).finally(() => {
              this.listLoading = false
            })
          }
        } else {
          this.$message.error('该条信息状态不符合删除条件！');
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //文件上传成功
    fileUploadSuccess(response, file, fileList) {
      this.fileList = fileList
    },
    //移除某一文件
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleAvatarSuccessbeforRescue(res, file) {
      this.beforRescueUrl = URL.createObjectURL(file.raw);
      this.form.animalDtoReq.beforRescuePhoto = res.data.url
    },
    handleAvatarSuccessafterRescue(res, file) {
      this.afterRescueUrl = URL.createObjectURL(file.raw);
      this.form.animalDtoReq.afterRescuePhoto = res.data.url
    },
    handleAvatarSuccessbeforAdopt(res, file) {
      this.beforAdoptUrl = URL.createObjectURL(file.raw);
      this.form.animalDtoReq.beforAdoptPhoto = res.data.url
    },
    handleAvatarSuccessafterAdopt(res, file) {
      this.afterAdoptUrl = URL.createObjectURL(file.raw);
      this.form.animalDtoReq.afterAdoptPhoto = res.data.url
    },
    search() {
      this.changTab(this.tabChoose, '')
    },
    changTab(active, old) {
      if (old !== 'changePage') {
        this.table.page = 1
      }
      this.table.participantId = this.id
      this.tabChoose = active
      if (active === 'rescue') {
        this.getRescueData()
      } else if (active === 'adopt') {
        this.getAdoptData()
      } else if (active === 'resource') {
        this.getResourceData()
      }
    },
    getResourceData() {
      this.listLoading = true
      getResourceList(this.table).then(response => {
        this.tableList = response.data.records
        this.total = response.data.total
      })
      this.listLoading = false
    },
    getAdoptData() {
      this.listLoading = true
      getAdoptList(this.table).then(response => {
        this.tableList = response.data.records
        this.total = response.data.total
      })
      this.listLoading = false
    },
    getRescueData() {
      this.listLoading = true
      getRescueList(this.table).then(response => {
        this.tableList = response.data.records
        this.total = response.data.total
      })
      this.listLoading = false
    },
    // 获取用户数据
    fetchData(param) {
      this.listLoading = true
      queryById(param).then(response => {
        this.userInfo = response.data
        let now = new Date()
        let createTime = new Date(this.userInfo.isBase === 'YES' ? this.userInfo.baseCreateTime : this.userInfo.createTime)
        this.userInfo.days = parseInt((now.getTime() - createTime.getTime()) / 86400000)
      })
      this.listLoading = false
    },
    // 分页组件选页改变时调用函数
    currentChange(newPage) {
      this.table.page = newPage
      this.changTab(this.tabChoose, 'changePage')
    },
    getLabelOptions(search) {
      getLabelList(search).then(response => {
        this.labelOption = response.data.records
      })
    },
  },
  destroyed() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#ffffff'
  }
}
</script>

<style scoped lang="scss">
.table-column {
  height: 100px;
}

.user-body {
  .user-info {

    background-color: white;
    padding: 3em;

    .user-info-img {
      display: inline-block;
      width: 8em;
      height: 8em;
      box-shadow: 1px 1px 5px #888888;

      .user-info-img-img {

      }
    }

    .user-info-text {
      width: 80%;
      display: inline-block;
      padding: 0 2em;
      vertical-align: top;

      .user-info-name {
        display: inline-block;
        font-size: 1.5em;
        line-height: 2em;
        font-weight: bolder;
      }

      .user-info-edit {
        display: inline-block;
        color: #bfbfbf;
        font-size: 0.9em;
        margin-left: 1em;
      }

      .user-info-word {
        font-size: 1em;
        line-height: 1.5em;

      }

      .user-info-word-num {
        color: #5ec231;
      }
    }
  }

  .user-list {
    background-color: white;

    .user-list-tab {
      margin: 1em 0;

      .user-list-tab-info {
        font-size: 0.95em;
        line-height: 1.45em;
        margin: 1em 0;
        color: #5a5e66;

        .user-list-tab-info-label {
          display: inline-block;
        }

        .user-list-tab-info-text {
          display: inline-block;
        }

        .user-list-tab-info-describe {
          text-indent: 2em;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }


      }

      .user-list-search {
        margin-bottom: 1em;

        .user-list-tab-search {
          display: inline-block;
          width: 40%;
          margin-right: 1em;
        }

        .user-list-tab-button {
          display: inline-block;
          width: 10%;
        }
      }

      .user-list-tab-label {
      }
    }
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
