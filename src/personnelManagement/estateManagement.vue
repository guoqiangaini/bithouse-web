
<template>
  <div>
    <div class="wai">
      <ul>
        <el-button size="mini" type="info" @click="addPostSet(1)">新增楼盘</el-button>
        <el-button size="mini" type="info" @click="addPostSet(2)">修改</el-button>
        <el-button size="mini" type="info" @click="deleteBuildingInfo">删除</el-button>
      </ul><!--按钮-->
    </div>
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      width="900px"
      @close="clearFormData('newPropertyForm')"
    >
      <el-form ref="newPropertyForm" :model="newPropertyForm" label-width="70px" size="small" :rules="rules"  :show-message="false">
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">楼盘信息填写</legend>
          <div class="basicData">
            <el-row>
              <el-col>
                <!--封面图片，是否隐藏推荐楼盘-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="楼盘封面图片" label-width="120px">
                      <el-upload
                        action="string"
                        :http-request='submitUploadBanner'
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                      >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="推荐楼盘" prop="hidding"  label-width="70px">
                      <el-select v-model="newPropertyForm.hidding" placeholder="请选择" clearable  style="width:320px">
                        <el-option label="显示" value="0"></el-option>
                        <el-option label="隐藏" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--楼盘名称，销售状态-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="楼盘名称" prop="housesName">
                      <el-input v-model="newPropertyForm.housesName" clearable style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="销售状态" prop="salesStatus">
                      <el-select v-model="newPropertyForm.salesStatus" placeholder="请选择" clearable style="width:320px">
                        <el-option label="未开盘" value="0"></el-option>
                        <el-option label="在售" value="1"></el-option>
                        <el-option label="停售" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--楼盘经度，楼盘维度-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="楼盘维度" prop="coordinateX">
                      <el-input v-model="newPropertyForm.coordinateX" clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="楼盘经度" prop="coordinateY">
                        <el-input v-model="newPropertyForm.coordinateY" clearable  style="width:320px"></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <!--开盘均价，开盘时间-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="开盘均价" prop="housesPrice">
                      <el-input  v-model="newPropertyForm.housesPrice" clearable style="width:320px"></el-input><small>元/m²</small>
                  </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="开盘日期" prop="openTime">
                      <el-date-picker
                        style="width:320px"
                      v-model="newPropertyForm.openTime"
                      type="date"
                      clearable
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  </el-col>
                </el-row>
                <!--楼盘最小面积，楼盘最大面积-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="最小面积" prop="measureMin">
                      <el-input v-model="newPropertyForm.measureMin" clearable style="width:320px"></el-input>m²
                  </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="最大面积" prop="measureMax">
                      <el-input v-model="newPropertyForm.measureMax" clearable style="width:320px"></el-input>m²
                  </el-form-item>
                  </el-col>
                </el-row>
                <!--楼盘卧室数量-->
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="卧室数量" prop="bedroomsNumber">
                      <el-select v-model="newPropertyForm.bedroomsNumber" multiple placeholder="请选择" style="width:730px" clearable>
                        <el-option
                          v-for="item in option"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--装修状态,是否推荐-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="装修状态" prop="decorationStatus">
                      <el-select v-model="newPropertyForm.decorationStatus" placeholder="请选择" clearable style="width:320px">
                        <el-option label="精装修" value="1"></el-option>
                        <el-option label="简装修" value="2"></el-option>
                        <el-option label="毛坯房" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="是否推荐" prop="recommend">
                      <el-select v-model="newPropertyForm.recommend" placeholder="请选择" clearable style="width:320px">
                        <el-option label="置顶" value="1"></el-option>
                        <el-option label="推荐" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--交房日期，物业类型-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="交房日期" prop="handleTime">
                    <el-date-picker
                      style="width:320px"
                      v-model="newPropertyForm.handleTime"
                      type="date"
                      clearable
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="物业类型" prop="propertyType">
                    <el-select v-model="newPropertyForm.propertyType" placeholder="请选择" clearable style="width:320px">
                      <el-option label="住宅" value="1"></el-option>
                      <el-option label="公寓" value="2"></el-option>
                      <el-option label="商品房" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  </el-col>
                </el-row>
                <!--建筑类型，产权年限-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="建筑类型" prop="buildingType">
                      <el-input v-model="newPropertyForm.buildingType" clearable  style="width:320px"></el-input>
                  </el-form-item></el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="产权年限" prop="yearLimit">
                      <el-select v-model="newPropertyForm.yearLimit" placeholder="请选择"  style="width:320px"clearable>
                      <el-option label="40" value="1"></el-option>
                      <el-option label="70" value="2"></el-option>
                    </el-select>
                    </el-form-item></el-col>
                </el-row>
                <!--主推户型，楼栋总数-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="主推户型" prop="majorLayout">
                        <el-input v-model="newPropertyForm.majorLayout" clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="楼栋总数" prop="buildingTotal">
                      <el-input v-model="newPropertyForm.buildingTotal" clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--开发商，楼盘区位-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="开发商" prop="developers">
                      <el-input v-model="newPropertyForm.developers" clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="楼盘位置" prop="district">
                        <el-select v-model="newPropertyForm.district" placeholder="选择区" clearable  style="width:320px">
                          <el-option
                          v-for="item in districts"
                          :key="item.id"
                          :label="item.area_name"
                          :value="item.id">
                        </el-option>
                      </el-select >
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--楼盘街道，楼盘详细地址-->
                <el-row>
                  <el-col  :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item prop="street" label="楼盘街道">
                      <el-input v-model="newPropertyForm.street" placeholder="输入街道路名称" clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col  :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item prop="detailAddress" label="详细地址">
                      <el-input v-model="newPropertyForm.detailAddress" placeholder="输入详细地址" clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--售楼位置，物业公司-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><el-form-item label="售楼位置" prop="salesLocation">
                    <el-input v-model="newPropertyForm.salesLocation"  style="width:320px"></el-input>
                  </el-form-item></el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><el-form-item label="物业公司" prop="propertyName">
                    <el-input v-model="newPropertyForm.propertyName"  style="width:320px"></el-input>
                  </el-form-item></el-col>
                </el-row>
                <!--物业费，占地面积-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="物业费" prop="propertyCosts">
                      <el-input v-model="newPropertyForm.propertyCosts" clearable  style="width:320px"></el-input>元
                  </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="占地面积" prop="plantArea">
                      <el-input v-model="newPropertyForm.plantArea" clearable  style="width:320px"></el-input>m²
                  </el-form-item>
                  </el-col>
                </el-row>
                <!--建筑面积，容积率-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="建筑面积" prop="buildingArea">
                      <el-input v-model="newPropertyForm.buildingArea" clearable  style="width:320px">
                    </el-input>m²
                  </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="容积率" prop="plotRatio">
                      <el-input v-model="newPropertyForm.plotRatio" clearable  style="width:320px"></el-input>%
                  </el-form-item>
                  </el-col>
                </el-row>
                <!--绿化率，规划户数-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="绿化率" prop="greeningRate">
                      <el-input v-model="newPropertyForm.greeningRate" clearable  style="width:320px"></el-input>%
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="规划户数" prop="households">
                      <el-input v-model="newPropertyForm.households" clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--规划车位，交通情况-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="规划车位" prop="carport">
                      <el-input v-model="newPropertyForm.carport" clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="周边交通" prop="trafficConditions">
                      <el-input v-model="newPropertyForm.trafficConditions"  clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--楼盘标签-->
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="楼盘标签" prop="buildTags">
                      <el-select v-model="newPropertyForm.buildTags" multiple placeholder="请选择标签,最多4条" style="width:730px" :multiple-limit="4" clearable>
                        <el-option
                          v-for="(item,index) in options"
                          :key="item.id"
                          :label="item.tag_name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--商业配套，学区-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="商业配套" prop="BUSINESS">
                      <el-input v-model="newPropertyForm.BUSINESS" clearable  style="width:320px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="学区" prop="schoolDistrict">
                      <el-input v-model="newPropertyForm.schoolDistrict" clearable  style="width:320px"></el-input>
                    </el-form-item></el-col>
                </el-row>
                <!--轮播图片上传-->
                <el-row>
                  <el-col>上传轮播图片</el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureA'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureA" :src="pictureA" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(1)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureB'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureB" :src="pictureB" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(2)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureC'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureC" :src="pictureC" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(3)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureD'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureD" :src="pictureD" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(4)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureE'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureE" :src="pictureE" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(5)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureF'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureF" :src="pictureF" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(6)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button size="mini" @click="dialogVisible = false" class="dialogCancelButton">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitPostSet('newPropertyForm')">提交</el-button>
      </div>
    </el-dialog>
    <el-table
      ref="multipleTable"
      :data="buildingInfo"
      size="mini"
      border
      highlight-current-row
      @current-change="handleRowChange"
      header-align="center"
      tooltip-effect="dark"
      :headerCellStyle="headerSetStyle"
      :cellStyle="cellSetStyle"
      style="width: 100%;position:inherit"
      class="elTableBorder"
    >
      <el-table-column
        align="center"
        prop="estate_name"
        label="楼盘名称"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"
        prop="average_price"
        label="价格"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"
        prop="build_covered"
        label="面积"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"
        prop="open_date"
        label="开盘时间"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"
        prop="owner_year"
        label="产权年限"
        width="100"
        :formatter="formatValue">

      </el-table-column>
      <el-table-column
        align="center"
        prop="developers"
        label="开发商"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"
        prop="property_fee"
        label="物业费"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"
        prop="deliver_date"
        label="交房日期"
        width="120">
      </el-table-column>

      <el-table-column
        align="center"
        prop="green_rate"
        label="绿化率"
        width="120">

      </el-table-column>
      <el-table-column
        align="center"
        prop="volumetric_rate"
        label="容积率"
        width="140">

      </el-table-column>
      <el-table-column
        align="center"
        prop="area_detail"
        label="位置"
        width="120">

      </el-table-column>
      <el-table-column
        align="center"
        prop="peripheral_traffic"
        label="周边交通"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="commercial_matching"
        label="配套设施">
      </el-table-column>
      <el-table-column
        align="center"
        prop="property_type"
        label="物业类型"
        :formatter="formatValue1">
      </el-table-column>
      <el-table-column
        align="center"
        prop="hide_recommend"
        label="推荐楼盘"
        :formatter="formatValue2">
      </el-table-column>
      <el-table-column
        align="center"
        prop="property_type"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="openDetails(scope.$index, scope.row)">查看户型</el-button>
        </template>
      </el-table-column>
    </el-table><!--楼盘信息表-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 60]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="text-align: right;margin-top: 20px">
    </el-pagination>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { mapState } from "vuex";
import ElRow from "element-ui/packages/row/src/row";
import ElCol from "element-ui/packages/col/src/col";
export default {
  components: {
    ElCol,
    ElRow
  },
  data() {
    return {
      roomList:[],
      currentRow :'',
      //分页字段
      total:0,
      currentPage:1,
      pageSize:20,
      //查询条件
      suggested:'',
      //楼盘信息
      buildingInfo:[],
      // 封面图片
      pictureCover:'',
      // 轮播图片
      pictureA:'',
      pictureB:'',
      pictureC:'',
      pictureD:'',
      pictureE:'',
      pictureF:'',
      //楼盘标签
      options: [],
      //卧室数量
      option: [{
        value: '1',
        label: '1室'
      }, {
        value: '2',
        label: '2室'
      }, {
        value: '3',
        label: '3室'
      }, {
        value: '4',
        label: '4室'
      }, {
        value: '5',
        label: '5室'
      }, {
        value: '6',
        label: '6室'
    }],
      // 烟台区县
      districts:[],
      //添加楼盘表单
      newPropertyForm: {
        hidding:'',
        housesName: '',///楼盘名称
        salesStatus: '',//销售状态
        coordinateX:'',//楼盘经度
        coordinateY:'',//楼盘维度
        housesPrice: '',//房产均价
        openTime: '',//开盘时间
        measureMin:'',//最小面积
        measureMax:'',//最大面积
        bedroomsNumber:[],//房间数量
        decorationStatus:'',//装修状态
        recommend:'',//是否推荐
        handleTime:'',//交房时间
        propertyType:'',//物业类型
        buildingType: '',//建筑类型
        yearLimit:'',//产权年限
        majorLayout:'',//主推户型
        buildingTotal:'',//楼栋总数
        developers:'',//开发商
        district:'',//楼盘所在区
        street:'',//楼盘所在街道
        detailAddress:'',//详情地址
        salesLocation:'',//售楼位置
        propertyName:'',//物业公司
        propertyCosts:'',//物业费
        plantArea:'',//占地面积
        buildingArea:'',//建筑面积
        plotRatio:'',//容积率
        greeningRate:'',//绿化率
        households:'',//规划户数
        carport:'',//规划车位
        trafficConditions:'',//交通情况
        auxiliaryFacilities:'',//配套设施
        buildTags:[],//楼盘标签
        BUSINESS:'',//商业配套
        schoolDistrict:'',//学区
      },
      //添加楼盘表单验证
      rules:{
        hidding:[
          {required: true, message: '请选择活动区域', trigger: 'change'},
        ],
        housesName:[
          {required: true, message: '请输入楼盘名称', trigger: 'blur'},
        ],
        salesStatus:[
          {required: true, message: '请选择活动区域', trigger: 'change'},
        ],
        coordinateX:[
          {required: true, message: '请填写经度', trigger: 'blur'},
          {pattern: /(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)\.([0-9]{6})/,trigger: 'blur'}
        ],
        coordinateY:[
          {required: true, message: '请填写维度', trigger: 'blur'},
          {pattern: /(?:[0-9]|[1-8][0-9]|90)\.([0-9]{6})/,trigger: 'blur'}
        ],
        housesPrice:[
          { required: true, message: '请输入房价',trigger: 'blur'},
          {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
        ],
        openTime:[
          {required: true, message: '请选择活动区域', trigger: 'change'},
        ],
        measureMin:[
          { required: true, message: '请输入面积',trigger: 'blur'},
          {pattern:/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
        ],
        measureMax:[
          { required: true, message: '请输入面积',trigger: 'blur'},
          {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
        ],
        bedroomsNumber:[
          { type: 'array', required: true, message: '请至少选择一个户室', trigger: 'change' }
        ],
        decorationStatus:[
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        recommend:[
          { required: true, message: '请选择推荐', trigger: 'change' }
        ],
        handleTime:[
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        propertyType:[
          { required: true, message: '请选择物业类型', trigger: 'change' }
        ],
        buildingType:[
          { required: true, message: '请输入建筑类型',trigger: 'blur'},
        ],
        yearLimit:[
          { required: true, message: '请选择产权年限', trigger: 'change'}
        ],
        majorLayout:[
          { required: true, message: '请输入户型',trigger: 'blur'},
        ],
        buildingTotal:[
          { required: true, message: '请输入总数',trigger: 'blur'},
          {pattern: /^[0-9]*$/,trigger: 'blur'}
        ],
        developers:[
          { required: true, message: '请填写开发商',trigger: 'blur'},
        ],
        district:[
          { required: true, message: '请选择区', trigger: 'change'}
        ],
        street:[
          { required: true, message: '请填写街道',trigger: 'blur'},
        ],
        detailAddress:[
          { required: true, message: '请填写详细地址',trigger: 'blur'},
        ],
        salesLocation:[
          { required: true, message: '请填写售楼地址',trigger: 'blur'},
        ],
        propertyName:[
          { required: true, message: '请填写物业公司',trigger: 'blur'},
        ],
        propertyCosts:[
          { required: true, message: '请填写物业费',trigger: 'blur'},
          {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
        ],
        plantArea:[
          { required: true, message: '请填写占地面积',trigger: 'blur'},
          {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
        ],
        buildingArea:[
          { required: true, message: '请填写建筑面积',trigger: 'blur'},
          {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
        ],
        plotRatio:[
          { required: true, message: '请填写容积率',trigger: 'blur'},
          {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
        ],
        greeningRate:[
          { required: true, message: '请填写绿化率',trigger: 'blur'},
          {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
        ],
        households:[
          { required: true, message: '请填写规划户数',trigger: 'blur'},
          {pattern: /^[0-9]*$/,trigger: 'blur'}
        ],
        carport:[
          { required: true, message: '请填写规划车位',trigger: 'blur'},
          {pattern: /^[0-9]*$/,trigger: 'blur'}
        ],
        trafficConditions:[
          { required: true, message: '请填写交通情况',trigger: 'blur'},
        ],
        auxiliaryFacilities:[
          { required: true, message: '请填写配套设施',trigger: 'blur'},
        ],
        buildTags:[
          { type: 'array', required: true, message: '请选择楼盘标签', trigger: 'change'}
        ],
        BUSINESS:[
          { required: true, message: '请填写商业配套',trigger: 'blur'},
        ],
        schoolDistrict:[
          { required: true, message: '请填写学区',trigger: 'blur'},
        ]
      },
      //
      positionInfoList: [],
      dialogVisible: false,
      dialogTitle: "", //弹窗标题
      isAdd: "", //1：新增0修改
    };
  },
  computed: {
    regserial() {
      return this.$store.state.regserial;
    },
    permissions_id() {
      return this.$store.state.permissions_id;
    },
    poster() {
      return this.$store.state.poster;
    },
    posters() {
      return this.$store.state.posters;
    },
    company_serial() {
      return this.$store.state.company_serial;
    },
    studentDepartment_serial() {
      return this.$store.state.studentDepartment_serial;
    },
    //获取性别信息
    gender() {
      return this.$store.state.genders;
    }
  },
  methods: {
    formatValue(row, column, cellValue){
      switch(row.owner_year) {
        case '1':
          return '40';
          break;
        case '2':
          return '70';
          break;
      }
    },
    formatValue1(row, column, cellValue){
      switch(row.property_type) {
        case '1':
          return '住宅';
          break;
        case '2':
          return '公寓';
          break;
        case '3':
          return '商品房';
          break;
      }
    },
    formatValue2(row, column, cellValue){
      switch(row.hide_recommend) {
        case '0':
          return '显示';
          break;
        case '2':
          return '隐藏';
          break;
      }
    },
     findBuilding(){
    },
    // 清除图片
    clearPictrue(type){
      var that=this
      if(type==1){
        that.pictureA=''
      }else if(type==2){
        that.pictureB=''
      }else if(type==3){
        that.pictureC=''
      }else if(type==4){
        that.pictureD=''
      }else if(type==5){
        that.pictureE=''
      }else if(type==6){
        that.pictureF=''
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getBuildingInfo()
    },
    handleRemove(file, fileList) {
      console.log('=========================================')
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getBuildingInfo()
    },
    //上传图片成功处理函数
    handleAvatarSuccess(){

    },
    //上传图片前处理函数
    beforeAvatarUpload(){

    },
    submitUploadBanner(file){
      this.submitUpload(file,1)
    },
    submitUploadpictureA(file){
      this.submitUpload(file,2)
    },
    submitUploadpictureB(file){
      this.submitUpload(file,3)
    },
    submitUploadpictureC(file){
      this.submitUpload(file,4)
    },
    submitUploadpictureD(file){
      this.submitUpload(file,5)
    },
    submitUploadpictureE(file){
      this.submitUpload(file,6)
    },
    submitUploadpictureF(file){
      this.submitUpload(file,7)
    },
    //上传图片函数
    submitUpload(file,flag) {
      var that=this
      let param = new FormData(); // 创建 form 对象
      param.append("file", file.file, file.file.name); // 通过 append 向 form 对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; // 添加请求头
      this.$axios
        .postImageRequest(
          "bitHouse/bitHouseUploadImage",
          param,
          config
        )
        .then(response => {
          if(flag==1){
            that.pictureCover=response.data.image_url
          }else if(flag==2){
            that.pictureA=response.data.image_url
          }else if(flag==3){
            that.pictureB=response.data.image_url
          }else if(flag==4){
            that.pictureC=response.data.image_url
          }else if(flag==5){
            that.pictureD=response.data.image_url
          }else if(flag==6){
            that.pictureE=response.data.image_url
          }else if(flag==7){
            that.pictureF=response.data.image_url
          }

        });
    },
    //查看户型
    openDetails(index,row){
      var that = this
      var id = row.id
      var roomData = {
        estate_id:id,
        count: true,
        orderby:'',
        pageindex:1,
        pagesize:20
      }
      var roomParams = {
        methodUrl: 'bitHouse/bitHouseGetRoom',
        jsonParam: qs.stringify(roomData)
      }
      this.$axios.postRequest(roomParams).then(function (res) {
        //成功之后处理逻辑
        that.roomList = res.data.list
        that.$router.push({name: 'houseTypeInfo', params: {roomData: that.roomList,buildingId:id}})
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

    },
    //弹框关闭清空数据
    clearFormData(formName) {
      this.$refs[formName].resetFields();
      this.pictureCover='';
      this.pictureA='';
      this.pictureB='';
      this.pictureC='';
      this.pictureD='';
      this.pictureE='';
      this.pictureF='';
    },
    //点击获取行数据
    handleRowChange(val) {
      this.currentRow = val;
    },
    addPostSet(type){
      var that=this
      if(type==1){
        that.isAdd = "1";
        that.dialogTitle = "新增楼盘";
        this.dialogVisible = true;
      }else {
        if (this.currentRow==null || this.currentRow=='') {
          this.$message({
            message: '请选择楼盘',
            showClose: true,
            type: 'warning'
          });
        } else {
            setTimeout(function() {
              that.isAdd = "2";
              that.dialogTitle = "修改楼盘信息";
              var roomArray=[];
              var rooms = that.currentRow.rooms.split(",");
              for(var i = 0; i<rooms.length; i++){
                roomArray.push(rooms[i]);
              }
              var tags = [];
              for(var j = 0; j<that.currentRow.tags.length; j++){
                tags.push(that.currentRow.tags[j].id);
              }
              that.newPropertyForm.hidding=that.currentRow.hide_recommend,
              that.newPropertyForm.housesName=that.currentRow.estate_name ,
              that.newPropertyForm.coordinateX=that.currentRow.coordinate_x,
              that.newPropertyForm.coordinateY=that.currentRow.coordinate_y,
              that.newPropertyForm.district=that.currentRow.area_id,
              that.newPropertyForm.street=that.currentRow.area_bref,
              that.newPropertyForm.detailAddress=that.currentRow.area_detail,
              that.newPropertyForm.bedroomsNumber=roomArray,
              that.newPropertyForm.measureMin=that.currentRow.measure_min,
              that.newPropertyForm.measureMax=that.currentRow.measure_max,
              that.newPropertyForm.salesStatus=that.currentRow. sale_state,
              that.newPropertyForm.housesPrice=that.currentRow.average_price,
              that.newPropertyForm.openTime=that.currentRow.open_date,
              that.newPropertyForm.handleTime=that.currentRow.deliver_date,
              that.newPropertyForm.propertyType=that.currentRow.property_type,
              that.newPropertyForm.buildingType=that.currentRow.building_type,
              that.newPropertyForm.yearLimit=that.currentRow.owner_year,
              that.newPropertyForm.decorationStatus=that.currentRow.decoration_state,
              that.newPropertyForm.majorLayout=that.currentRow.major_layout,
              that.newPropertyForm.buildingTotal=that.currentRow.building_sum,
              that.newPropertyForm.developers=that.currentRow.developers,
              that.newPropertyForm.salesLocation=that.currentRow.sale_area,
              that.newPropertyForm.propertyName=that.currentRow.property_company,
              that.newPropertyForm.propertyCosts=that.currentRow.property_fee,
              that.newPropertyForm.plantArea=that.currentRow.area_covered,
              that.newPropertyForm.buildingArea=that.currentRow.build_covered,
              that.newPropertyForm.plotRatio=that.currentRow.volumetric_rate,
              that.newPropertyForm.greeningRate=that.currentRow.green_rate,
              that.newPropertyForm.households=that.currentRow.plan_households,
              that.newPropertyForm.carport=that.currentRow.plan_parkinglot,
              that.pictureCover=that.currentRow.pic_url,
              that.newPropertyForm.recommend=that.currentRow.recommend,
              that.newPropertyForm.BUSINESS=that.currentRow.commercial_matching,
              that.newPropertyForm.schoolDistrict=that.currentRow.school_district,
              that.newPropertyForm.trafficConditions=that.currentRow.peripheral_traffic,
              that.newPropertyForm.buildTags=tags,
              that.pictureA=that.currentRow.image_a,
              that.pictureB=that.currentRow.image_b,
              that.pictureC=that.currentRow.image_c,
              that.pictureD=that.currentRow.image_d,
              that.pictureE=that.currentRow.image_e,
              that.pictureF=that.currentRow.image_f
          },0 )
            this.dialogVisible = true;
        }
      }

    },
    headerSetStyle() {
      return {
        "background-color": "#e5e5e5",
        color: "#303133",
        "border-color": "#c1c3c9"
      };
    },
    cellSetStyle() {
      return {
        color: "#606266",
        "border-color": "#c1c3c9"
      };
    },
    //获取楼盘信息
    getBuildingInfo(){
      var that=this
      var getBuildingInfoData={
        recommend:this.suggested,
        count:true,
        orderby:'',
        pageindex:this.currentPage,
        pagesize:this.pageSize,
      }
      var getBuildingInfoParams={
        methodUrl:'bitHouse/bitHouseGetBuilding',
        jsonParam: qs.stringify(getBuildingInfoData)
      }
      this.$axios.postRequest(getBuildingInfoParams).then(
        function(res) {
          //成功之后处理逻辑
          that.buildingInfo=res.data.list
          that.total=res.data.totalcount
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    //提交新增、修改楼盘信息
    submitPostSet(formName) {
      var that=this

      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that=this
          if(that.pictureCover==null||that.pictureCover==''){
            that.$message({
              message: '封面图片未上传',
              showClose: true,
              type: 'warning'
            });
          }else if(this.isAdd==1){
            var that=this
            var buildingData = {
              hide_recommend:this.newPropertyForm.hidding,
              estate_name:this.newPropertyForm.housesName ,
              coordinate_x:this.newPropertyForm.coordinateX,
              coordinate_y:this.newPropertyForm.coordinateY,
              area_id:this.newPropertyForm.district,
              area_bref:this.newPropertyForm.street,
              area_detail:this.newPropertyForm.detailAddress,
              rooms:this.newPropertyForm.bedroomsNumber.join(','),
              measure_min:this.newPropertyForm.measureMin,
              measure_max:this.newPropertyForm.measureMax ,
              sale_state:this.newPropertyForm.salesStatus,
              average_price:this.newPropertyForm.housesPrice,
              open_date:this.newPropertyForm.openTime,
              deliver_date:this.newPropertyForm.handleTime,
              property_type:this.newPropertyForm.propertyType,
              building_type:this.newPropertyForm.buildingType,
              owner_year:this.newPropertyForm.yearLimit,
              decoration_state:this.newPropertyForm.decorationStatus,
              major_layout:this.newPropertyForm.majorLayout,
              building_sum:this.newPropertyForm.buildingTotal,
              developers:this.newPropertyForm.developers,
              sale_area:this.newPropertyForm.salesLocation,
              property_company:this.newPropertyForm.propertyName,
              property_fee:this.newPropertyForm.propertyCosts,
              area_covered:this.newPropertyForm.plantArea ,
              build_covered:this.newPropertyForm.buildingArea,
              volumetric_rate:this.newPropertyForm.plotRatio,
              green_rate:this.newPropertyForm.greeningRate,
              plan_households:this.newPropertyForm.households,
              plan_parkinglot:this.newPropertyForm.carport,
              pic_url:this.pictureCover,
              recommend:this.newPropertyForm.recommend ,
              commercial_matching:this.newPropertyForm.BUSINESS,
              school_district:this.newPropertyForm.schoolDistrict,
              peripheral_traffic:this.newPropertyForm.trafficConditions,
              tag_ids:this.newPropertyForm.buildTags.join(','),
              image_a:this.pictureA,
              image_b:this.pictureB ,
              image_c:this.pictureC ,
              image_d:this.pictureD ,
              image_e:this.pictureE ,
              image_f:this.pictureF ,
            };
            var buildingParams = {
              methodUrl: "bitHouse/bitHouseAddBuilding",
              jsonParam: qs.stringify(buildingData)
            };
          }else{
            var id=this.currentRow.id
            var buildingData= {
              id:id,
              hide_recommend:this.newPropertyForm.hidding,
              estate_name:this.newPropertyForm.housesName ,
              coordinate_x:this.newPropertyForm.coordinateX,
              coordinate_y:this.newPropertyForm.coordinateY,
              area_id:this.newPropertyForm.district,
              area_bref:this.newPropertyForm.street,
              area_detail:this.newPropertyForm.detailAddress,
              rooms:this.newPropertyForm.bedroomsNumber.join(','),
              measure_min:this.newPropertyForm.measureMin,
              measure_max:this.newPropertyForm.measureMax ,
              sale_state:this.newPropertyForm.salesStatus,
              average_price:this.newPropertyForm.housesPrice,
              open_date:this.newPropertyForm.openTime,
              deliver_date:this.newPropertyForm.handleTime,
              property_type:this.newPropertyForm.propertyType,
              building_type:this.newPropertyForm.buildingType,
              owner_year:this.newPropertyForm.yearLimit,
              decoration_state:this.newPropertyForm.decorationStatus,
              major_layout:this.newPropertyForm.majorLayout,
              building_sum:this.newPropertyForm.buildingTotal,
              developers:this.newPropertyForm.developers,
              sale_area:this.newPropertyForm.salesLocation,
              property_company:this.newPropertyForm.propertyName,
              property_fee:this.newPropertyForm.propertyCosts,
              area_covered:this.newPropertyForm.plantArea ,
              build_covered:this.newPropertyForm.buildingArea,
              volumetric_rate:this.newPropertyForm.plotRatio,
              green_rate:this.newPropertyForm.greeningRate,
              plan_households:this.newPropertyForm.households,
              plan_parkinglot:this.newPropertyForm.carport,
              pic_url:this.pictureCover,
              recommend:this.newPropertyForm.recommend ,
              commercial_matching:this.newPropertyForm.BUSINESS,
              school_district:this.newPropertyForm.schoolDistrict,
              peripheral_traffic:this.newPropertyForm.trafficConditions,
              tag_ids:this.newPropertyForm.buildTags.join(','),
              image_a:this.pictureA,
              image_b:this.pictureB ,
              image_c:this.pictureC ,
              image_d:this.pictureD ,
              image_e:this.pictureE ,
              image_f:this.pictureF ,
            };
            var buildingParams={
              methodUrl: "bitHouse/bitHouseUpdateBuilding",
              jsonParam: qs.stringify(buildingData)
            }
          }
          this.$axios.postRequest(buildingParams).then(
            function(res) {
              //成功之后处理逻辑
            },
            function(res) {
              //失败之后处理逻辑
              console.log("error:" + res);
            }
          );
        } else {
          this.$message({
            message: '您有未填写的信息!',
            showClose: true,
            type: 'warning'
          });
          that.dialogVisible =true ;
        }
      });
      that.getBuildingInfo()
      that.dialogVisible = false;
    },
    //删除楼盘
    deleteBuildingInfo() {
      var that = this;
      if(this.currentRow==null || this.currentRow==''){
        this.$message({
          message: '请选择楼盘',
          showClose: true,
          type: 'warning'
        });
      } else if (this.currentRow!='') {
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          var deleteData = {
           id:that.currentRow.id
          };
          var deleteParams = {
            methodUrl: "bitHouse/bitHouseDeleteBuilding",
            jsonParam: qs.stringify(deleteData)
          };
          this.$axios.postRequest(deleteParams).then(
            function(res) {
              //成功之后处理逻辑
              that.getBuildingInfo();
              that.$message({
                type: "success",
                message: "删除成功"
              });
            },
            function(res) {
              //失败之后处理逻辑
              console.log("error:" + res);
              that.$message({
                type: "error",
                message: "删除失败"
              });
            }
          );
        })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          message: "请选择数据",
          showClose: true,
          type: "warning"
        });
      }
    },
  },
  mounted() {
    this.getBuildingInfo();
    //获取地区
    var that=this
    var areasData={
    }
    var areasParams={
      methodUrl:'bitHouse/bitHouseGetArea',
      jsonParam: qs.stringify(areasData)
    }
    this.$axios.postRequest(areasParams).then(
      function(res) {
        //成功之后处理逻辑
        that.districts=res.data
      },
      function(res) {
        //失败之后处理逻辑
        console.log("error:" + res);
      }
    );
    //获取标签
    var tagsData={
      tag_type:1
    }
    var tagsParams={
      methodUrl:'bitHouse/bitHouseGetTags',
      jsonParam: qs.stringify(tagsData)
    }
    this.$axios.postRequest(tagsParams).then(
      function(res) {
        //成功之后处理逻辑
        that.options=res.data
      },
      function(res) {
        //失败之后处理逻辑
        console.log("error:" + res);
      }
    );
  }
};
</script>
<style scoped>
  .basicData {
    padding-left:10px;
  }
  .wai ul {
    float: left;
    margin: 10px;
  }
  .el-input{
    width: 300px;
  }
  .el-select{
    width: 300px;
  }
   .el-form-item--mini{
    line-height: 28px !important;
  }
  .el-upload-dragger{
    width: 240px;
    height: 180px;
  }
</style>
